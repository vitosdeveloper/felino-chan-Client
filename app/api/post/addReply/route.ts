import {
  addPost,
  addReplyAndBump,
  getCat,
  getIdCountAndIncrementByOne,
  getPostHour,
} from '@/helpers/serverActionsHelper';
import { isPost } from '@/lib/mongoHelper';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  try {
    const {
      email,
      assunto,
      postContent,
      password,
      allowCatImage,
      threadNumber,
    } = await request.json();

    const form = {
      email,
      assunto,
      postContent,
      password,
      allowCatImage,
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
    return NextResponse.json({ message: 'success!!!' });
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message || 'Error posting new reply.');
  }
};
