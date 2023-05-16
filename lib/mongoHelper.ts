import { Post } from '@/types/generalTypes';
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

const processPost = (data: Post | Post[]) => {
  const process = (dataToProcess: Post) => {
    delete dataToProcess.password;
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

const processData = (data: unknown) => {
  if (Array.isArray(data)) {
    return processPost(data.filter(isPost));
  }
  if (isPost(data)) return processPost(data);
};

export const getAllThreads = async () => {
  const { collection, connection } = await getCollectionAndConnection('posts');
  const threads = await collection
    .find({ op: true })
    .sort({ $natural: -1 })
    .toArray();
  await connection.close();
  return processData(threads);
};

export const getThreadsByPageAndItsReplys = async (threadId: number) => {
  const { collection, connection } = await getCollectionAndConnection('posts');
  const result = await collection
    .find({
      $or: [{ randomIdGeneratedByMe: threadId }, { reply: threadId }],
    })
    .toArray();
  const processedResult = processData(result) as Post[];
  await connection.close();
  const [thread, replys, redirectTo] = [
    processedResult.find((p) => p.op),
    processedResult.filter((p) => p.reply === threadId),
    processedResult.find((p) => p.randomIdGeneratedByMe === threadId),
  ];
  return { thread, replys, redirectTo };
};

export const getThreadsAndItsReplysByPage = async (page: number) => {
  const { collection, connection } = await getCollectionAndConnection('posts');
  const postsPerPage = 8;
  const [startFrom, stopOn] = [
    page * postsPerPage - postsPerPage,
    postsPerPage,
  ];
  const findThreadsByPage = await collection
    .find({ op: true })
    .sort({ $natural: -1 })
    .skip(startFrom)
    .limit(stopOn)
    .toArray();

  if (!findThreadsByPage.length) return;
  const processedTreads = findThreadsByPage.map(processData);
  if (!processedTreads.length) return;
  const replysQuery = processedTreads.map((thread) => {
    return { reply: (thread as Post).randomIdGeneratedByMe };
  });
  if (!replysQuery.length) return;
  const findAllReplys = await collection.find({ $or: replysQuery }).toArray();
  findAllReplys.reverse();
  await connection.close();
  return { threads: processedTreads, replys: findAllReplys.map(processData) };
};

export const removeOldThreadsAndItsReplys = async () => {
  try {
    const { collection, connection } = await getCollectionAndConnection(
      'posts'
    );
    const res = await collection
      .find({ op: true })
      .sort({ $natural: -1 })
      .skip(80)
      .toArray();
    if (!res.length) {
      return;
    }
    const query = res.map((r) => [
      { randomIdGeneratedByMe: r.randomIdGeneratedByMe },
      { reply: r.randomIdGeneratedByMe },
    ]);
    const flatQuery = query.flat();
    if (!flatQuery.length) {
      throw new Error('Something went wrong.');
    }
    await collection.deleteMany({ $or: flatQuery as any[] });
    await connection.close();
    return;
  } catch (error) {}
};
