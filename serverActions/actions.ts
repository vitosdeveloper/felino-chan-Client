'use server';

import { getCollectionAndConnection, isPost } from '@/lib/mongoHelper';
import { revalidatePath } from 'next/cache';

export const parseIncomingDataToObject = (data: any) => {
  const object: any = {};
  for (const key of data) {
    object[key[0]] = key[1];
  }
  return object;
};

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
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
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
    const { postNumberIs }: any = await collection.findOne();
    if (!postNumberIs) throw new Error('Error connecting to the DB');
    const randomIdGeneratedByMe = postNumberIs + 1;
    await collection.updateOne({ postNumberIs }, { $inc: { postNumberIs: 1 } });
    await connection.close();
    return randomIdGeneratedByMe;
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
    if (!res) throw new Error('Error adding post.');
    await connection.close();
    return true;
  } catch (error) {
    throw new Error('Error adding new post to Database.');
  }
};

export const addThread = async (data: FormData) => {
  'use server';
  const get = (value: string) => data.get(value);
  try {
    const form = {
      email: get('email'),
      assunto: get('assunto'),
      postContent: get('postContent'),
      password: get('password'),
    };
    if (
      !form.postContent ||
      String(form.postContent).trim() === '' ||
      !form.password ||
      String(form.password).trim() === ''
    ) {
      throw new Error('Password or main content are missing.');
    }
    const [cat] = await getCat();
    const { url: catUrl, width: catWidth, height: catHeight } = cat;
    const randomIdGeneratedByMe = await getIdCountAndIncrementByOne();
    const mountedThread = {
      ...form,
      board: 'hw',
      reply: null,
      op: true,
      postDay: getPostHour(),
      catUrl,
      catWidth,
      catHeight,
      randomIdGeneratedByMe,
    };
    if (isPost(mountedThread)) {
      await addPost(mountedThread);
      revalidatePath('/hw/1/');
      return { status: 200, message: 'Success!' };
    }
  } catch (error: any) {
    throw new Error(error.message || 'Some error creating the post');
  }
};

export const addReplyAndBump = async (
  mountedPost: any,
  threadToClone: number
) => {
  try {
    await addPost(mountedPost);
    const { collection, connection } = await getCollectionAndConnection(
      'posts'
    );
    const threadQuery = await collection.findOne({
      randomIdGeneratedByMe: threadToClone,
    });
    const threadToBump: any = threadQuery;
    delete threadToBump._id;
    await collection.insertOne(threadToBump);
    await collection.deleteOne({ randomIdGeneratedByMe: threadToClone });
    await connection.close();
  } catch (error: any) {
    throw new Error(
      error.message || 'Error creating reply and bumping the thread.'
    );
  }
};
