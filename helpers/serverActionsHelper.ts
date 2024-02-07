import { getCollectionAndConnection } from '@/lib/mongoHelper';
import { ObjectId } from 'mongodb';

export const getPostHour = () => {
  const dayName = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  const diaDaSemana = dayName[new Date().getDay()];
  const dataNumero = new Date().toISOString().slice(0, 10);
  const horaCompleta =
    new Date().getHours() +
    `:` +
    new Date().getMinutes() +
    `:` +
    new Date().getSeconds();

  return `${dataNumero} ${diaDaSemana} ${horaCompleta}`;
};

export const getCat = async () => {
  try {
    const res = await fetch(
      'https://api.thecatapi.com/v1/images/search?mime_types=jpg,png',
      {
        cache: 'no-store',
      }
    );
    if (!res.ok) throw new Error();
    const cat = await res.json();
    return cat;
  } catch (error) {
    throw new Error('Error getting cat image.');
  }
};

export const getIdCountAndIncrementByOne = async () => {
  try {
    const { collection, connection } = await getCollectionAndConnection(
      'postcounts'
    );
    const number = await collection.findOneAndUpdate(
      {},
      { $inc: { postNumberIs: 1 } }
    );
    if (!number) {
      await collection.insertOne({ postNumberIs: 0 });
      await connection.close();
      return 0;
    }
    return number.postNumberIs + 1;
  } catch (error) {
    throw new Error('Error getting post Id counting.');
  }
};

export const addPost = async (mountedPost: any) => {
  try {
    const { collection, connection } = await getCollectionAndConnection(
      'posts'
    );
    const res = await collection.insertOne(mountedPost);
    if (!res || !res.acknowledged) throw new Error('Error adding post.');
    await connection.close();
    delete mountedPost.password;
    return { ...mountedPost, _id: res.insertedId };
  } catch (error) {
    throw new Error('Error adding new post to Database.');
  }
};

export const bump = async (threadId: number) => {
  const { collection, connection } = await getCollectionAndConnection('posts');
  const threadToBump: any = await collection.findOneAndDelete({
    randomIdGeneratedByMe: threadId,
  });
  delete threadToBump._id;
  await collection.insertOne(threadToBump);
  await connection.close();
};

export const addReplyAndBump = async (
  mountedPost: any,
  threadToClone: number
) => {
  try {
    await addPost(mountedPost);
    await bump(threadToClone);
  } catch (error: any) {
    throw new Error(
      error.message || 'Error creating reply and bumping the thread.'
    );
  }
};
