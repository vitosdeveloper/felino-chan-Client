'use server';

import {
  addPost,
  addReplyAndBump,
  getCat,
  getIdCountAndIncrementByOne,
  getPostHour,
} from '@/helpers/serverActionsHelper';
import { isPost } from '@/lib/mongoHelper';
import { revalidatePath } from 'next/cache';

export const handleReply = async (formData: FormData, threadNumber: any) => {
  try {
    const reply = {
      email: formData.get('email'),
      assunto: formData.get('assunto'),
      postContent: formData.get('postContent'),
      password: formData.get('password'),
      allowCatImage: !!formData.get('allowCatImage'),
    };

    const { email, assunto, postContent, password, allowCatImage } = reply;
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

    revalidatePath('/hw/[pageNumber]', 'page');
    revalidatePath('/hw/catalog', 'page');
    revalidatePath('/res/[threadId]', 'page');
  } catch (error) {
    console.log(error);
  }
};
