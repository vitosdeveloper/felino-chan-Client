'use server';
import {
  addPost,
  addReplyAndBump,
  getCat,
  getIdCountAndIncrementByOne,
  getPostHour,
} from '@/helpers/serverActionsHelper';
import {
  getCollectionAndConnection,
  isPost,
  removeOldThreadsAndItsReplys,
} from '@/lib/mongoHelper';
import { Post } from '@/types/generalTypes';
import { ObjectId } from 'mongodb';

export const addThread = async (data: FormData) => {
  ('use server');
  const get = (value: string) => data.get(value);
  try {
    const form = {
      email: get('email'),
      assunto: get('assunto'),
      postContent: get('postContent'),
      password: get('password'),
      allowCatImage: get('allowCatImage'),
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
      await removeOldThreadsAndItsReplys();
      return { status: 200, message: 'Success!' };
    }
  } catch (error: any) {
    throw new Error(error.message || 'Some error creating the post');
  }
};

export const addReply = async (data: FormData, threadNumber: number) => {
  'use server';
  try {
    const get = (value: string) => data.get(value);
    const form = {
      email: get('email'),
      assunto: get('assunto'),
      postContent: get('postContent'),
      password: get('password'),
      allowCatImage: get('allowCatImage'),
    };
    if (
      !form.postContent ||
      String(form.postContent).trim() === '' ||
      !form.password ||
      String(form.password).trim() === ''
    ) {
      throw new Error('Password or main content are missing.');
    }
    if (form.allowCatImage) {
      const [cat] = await getCat();
      const { url: catUrl, width: catWidth, height: catHeight } = cat;
      const randomIdGeneratedByMe = await getIdCountAndIncrementByOne();
      const mountedReply = {
        ...form,
        board: 'hw',
        reply: threadNumber,
        op: false,
        postDay: getPostHour(),
        catUrl,
        catWidth,
        catHeight,
        randomIdGeneratedByMe,
      };

      if (isPost(mountedReply)) {
        if (mountedReply.email === 'sage' || mountedReply.email === 'SAGE') {
          await addPost(mountedReply);
        } else {
          await addReplyAndBump(mountedReply, threadNumber!);
        }
      }
    } else {
      const randomIdGeneratedByMe = await getIdCountAndIncrementByOne();
      const mountedReply = {
        ...form,
        board: 'hw',
        reply: threadNumber,
        op: false,
        postDay: getPostHour(),
        catUrl: null,
        catWidth: null,
        catHeight: null,
        randomIdGeneratedByMe,
      };
      if (mountedReply.email === 'sage' || mountedReply.email === 'SAGE') {
        await addPost(mountedReply);
      } else {
        await addReplyAndBump(mountedReply, threadNumber!);
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || 'Error posting new reply.');
  }
};

export const removePost = async (id: string, password: string) => {
  try {
    const { collection, connection } = await getCollectionAndConnection(
      'posts'
    );
    const post = await collection.findOne({ _id: new ObjectId(id) });
    if (!post) {
      throw new Error('Post not found.');
    }
    if (post.password !== password) {
      await connection.close();
      throw new Error('Wrong password!');
    }
    await collection.deleteOne({ _id: new ObjectId(id) });
    await connection.close();
  } catch (error) {
    throw new Error((error as Error).message || 'Something went wrong.');
  }
};
