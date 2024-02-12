import { Post } from '@/types/generalTypes';
import { IBoards } from '@/utils/boards';
import { MongoClient } from 'mongodb';
import sanitizeHtml from 'sanitize-html';

export const getCollectionAndConnection = async (collectionName: string) => {
  try {
    const url = process.env.MONGO_URL;
    if (!url) throw new Error('Check the .env.local');
    const connection = new MongoClient(url);
    await connection.connect();
    const db = connection.db('imageboard');
    const collection = db.collection(collectionName);
    return { collection, connection };
  } catch (error: any) {
    throw new Error(error.message || 'Error connecting to the DB.');
  }
};

export const isPost = (post: unknown): post is Post => {
  if (
    post &&
    typeof post === 'object' &&
    'board' in post &&
    'email' in post &&
    'postContent' in post &&
    'postDay' in post &&
    'catWidth' in post &&
    'catHeight' in post &&
    'randomIdGeneratedByMe' in post &&
    'reply' in post &&
    'catUrl' in post &&
    'op' in post
  ) {
    return true;
  }
  return false;
};

const processPost = (data: Post | Post[], withPass?: boolean) => {
  const process = (dataToProcess: Post) => {
    if (!withPass) {
      delete dataToProcess.password;
    }
    return {
      ...dataToProcess,
      _id: dataToProcess._id.toString(),
      postContent: sanitizeHtml(
        dataToProcess.postContent
          .replace(
            /(^>{1}[^>])([^\r^\n]+)?/gm,
            '<span class="greenText">$1$2</span>'
          )
          .replace(
            /(^>{2}[^>])(\S+)?/gm,
            '<a on-click class="quote" href="/res/$1$2">$1$2</a>'
          )
          .replace(/href="\/res\/>>/g, 'href="/res/')
          .replace(
            /(^>{3}[^>])([^\r^\n]+)?/gm,
            '<span class="pinkText">$1$2</span>'
          )
          .replace(/\s{2,}/g, '\n')
          .replace(
            /(https?:\/\/\S+|www\.\S+)/gi,
            '<a target="_blank" href="$&">$&</a>'
          ),
        { allowedAttributes: { span: ['class'], a: ['class', 'href'] } }
      ),
    };
  };
  if (Array.isArray(data)) {
    return data.map(process);
  }
  return process(data);
};

const processData = (data: unknown, withPass?: boolean) => {
  if (Array.isArray(data)) {
    return processPost(data, withPass);
  }
  if (data) return processPost(data as Post[], withPass);
};

// export const getAllThreads = async () => {
//   const { collection, connection } = await getCollectionAndConnection('posts');
//   const threads = await collection
//     .find({ op: true })
//     .sort({ $natural: -1 })
//     .project({ password: false })
//     .toArray();
//   await connection.close();
//   return processData(threads);
// };

export const getAllThreadsFromSomeBoard = async (board: IBoards) => {
  const { collection, connection } = await getCollectionAndConnection('posts');
  const threads = await collection
    .find({ op: true, board })
    .sort({ $natural: -1 })
    .project({
      _id: 1,
      catUrl: 1,
      catWidth: 1,
      catHeight: 1,
      postContent: 1,
      randomIdGeneratedByMe: 1,
    })
    .toArray();
  await connection.close();
  return processData(threads);
};

// export const getAllPosts = async () => {
//   const { collection, connection } = await getCollectionAndConnection('posts');
//   const posts = await collection.find().toArray();
//   await connection.close();
//   return processData(posts);
// };

export const getThreadsByPageAndItsReplys = async (
  threadId: number,
  board: IBoards
) => {
  const { collection, connection } = await getCollectionAndConnection('posts');
  const result = await collection
    .find({
      $or: [
        { randomIdGeneratedByMe: threadId, board },
        { reply: threadId, board },
      ],
    })
    .toArray();
  const processedResult = processData(result, true) as Post[];
  await connection.close();
  const thread = processedResult.find((p) => p.op);
  const replys = processedResult
    .map((r) => {
      !r.op && delete r.password;
      return r;
    })
    .filter((p) => p.reply === threadId);
  const redirectTo = processedResult.find(
    (p) => p.randomIdGeneratedByMe === threadId
  );

  return { thread, replys, redirectTo };
};

export const getThreadsAndItsReplysByPage = async (
  page: number,
  board: IBoards
) => {
  const { collection, connection } = await getCollectionAndConnection('posts');
  const postsPerPage = 8;
  const [startFrom, stopOn] = [
    page * postsPerPage - postsPerPage,
    postsPerPage,
  ];
  const findThreadsByPage = await collection
    .find({ op: true, board })
    .sort({ $natural: -1 })
    .skip(startFrom)
    .limit(stopOn)
    .project({ password: false })
    .toArray();
  if (!findThreadsByPage.length) return await connection.close();
  const processedThreads = findThreadsByPage.map((i) => processData(i));
  if (!processedThreads.length) return await connection.close();
  const threadIds = findThreadsByPage.map(
    (thread) => thread.randomIdGeneratedByMe
  );
  const findAllReplys = await collection
    .find({ reply: { $in: threadIds } })
    .sort({ randomIdGeneratedByMe: -1 })
    .project({ password: false })
    .toArray();
  const replysObj: { [key: string]: Post[] } = {};
  (findAllReplys as Post[]).forEach((re) => {
    const selectedObj = replysObj[re.reply as number];
    if (!selectedObj) return (replysObj[re.reply as number] = [re]);
    return selectedObj.push(re);
  });
  const lastFiveReplys = Object.keys(replysObj)
    .map((key) => replysObj[key].slice(0, 5))
    .flat();
  await connection.close();
  const processedReplies = lastFiveReplys.map((i) => processData(i)).reverse();
  return {
    threads: processedThreads,
    replys: processedReplies,
  };
};

export const removeOldThreadsAndItsReplys = async (board: IBoards) => {
  try {
    const { collection, connection } = await getCollectionAndConnection(
      'posts'
    );
    const threadsNumber = await collection.countDocuments({ op: true, board });
    const limiteDeThreadsPorBoard = 80;
    if (threadsNumber <= limiteDeThreadsPorBoard)
      return await connection.close();
    const res = await collection
      .find({ op: true, board })
      .sort({ $natural: -1 })
      .skip(limiteDeThreadsPorBoard)
      .toArray();
    if (!res.length) return await connection.close();
    const query = res.map((r) => [
      { randomIdGeneratedByMe: r.randomIdGeneratedByMe, board },
      { reply: r.randomIdGeneratedByMe, board },
    ]);
    const flatQuery = query.flat();
    if (!flatQuery.length) {
      await connection.close();
      throw new Error('Something went wrong.');
    }
    await collection.deleteMany({ $or: flatQuery as any[] });
    await connection.close();
    return;
  } catch (error) {
    console.log(error);
  }
};
