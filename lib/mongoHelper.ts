import { Post } from '@/types/generalTypes';
import { MongoClient, ObjectId } from 'mongodb';
import sanitizeHtml from 'sanitize-html';

const getCollectionAndConnection = async (collectionName: string) => {
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

const processData = (data: { _id: ObjectId; password?: string }) => {
  if (isPost(data)) {
    delete data.password;

    return {
      ...data,
      _id: data._id.toString(),
      postContent: sanitizeHtml(
        data.postContent
          //  greentext
          .replace(
            /(^>{1}[^>])([^\r^\n]+)?/gm,
            '<span class="greenText">$1$2</span>'
          )
          //  quote
          .replace(
            /(^>{2}[^>])(\S+)?/gm,
            '<a class="quote" href="/res/$1$2">$1$2</a>'
          )
          //  quote href fix
          .replace('href="/res/>>', 'href="/res/')
          //  pinktext
          .replace(
            /(^>{3}[^>])([^\r^\n]+)?/gm,
            '<span class="pinkText">$1$2</span>'
          ),
        { allowedAttributes: { span: ['class'], a: ['class', 'href'] } }
      ),
    };
  }
};

export const getThreadsByPage = async (page: number) => {
  const { collection, connection } = await getCollectionAndConnection('posts');
  const postsPerPage = 8;
  const [startFrom, stopOn] = [
    page * postsPerPage - postsPerPage,
    page * postsPerPage,
  ];
  const findThreadsByPage = await collection
    .find({ op: true })
    .sort({ $natural: -1 })
    .skip(startFrom)
    .limit(stopOn)
    .toArray();
  await connection.close();
  return findThreadsByPage.map(processData);
};

export const getLastFiveReplys = async (threadId: number) => {
  const { collection, connection } = await getCollectionAndConnection('posts');
  const fiveLastReplys = await collection
    .find({ reply: threadId })
    .sort({ $natural: -1 })
    .skip(0)
    .limit(5)
    .toArray();
  await connection.close();
  return fiveLastReplys.map(processData).reverse();
};
