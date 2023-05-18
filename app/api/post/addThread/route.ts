import {
  addPost,
  getCat,
  getIdCountAndIncrementByOne,
  getPostHour,
} from '@/helpers/serverActionsHelper';
import { isPost, removeOldThreadsAndItsReplys } from '@/lib/mongoHelper';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const { email, assunto, postContent, password } = await request.json();
    if (
      !postContent ||
      !password ||
      String(postContent).trim() === '' ||
      String(password).trim() === ''
    ) {
      throw new Error('Password or main content are missing.');
    }
    const form = {
      email: email || '',
      assunto: assunto || '',
      postContent,
      password,
    };

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
      const newPost = await addPost(mountedThread);
      await removeOldThreadsAndItsReplys();
      return NextResponse.json({ newPost });
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
