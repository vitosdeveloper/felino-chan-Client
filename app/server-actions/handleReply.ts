'use server';
import {
  addPost,
  addReplyAndBump,
  getCat,
  getIdCountAndIncrementByOne,
  getPostHour,
} from '@/helpers/serverActionsHelper';
import { isPost } from '@/lib/mongoHelper';
import { IBoards } from '@/utils/boards';
import { revalidatePath } from 'next/cache';

export const handleReply = async (
  state: { error: string },
  formData: FormData,
  threadNumber: any,
  board: IBoards
) => {
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
    const randomIdGeneratedByMe = await getIdCountAndIncrementByOne();
    const newReply = {
      ...form,
      board,
      reply: threadNumber,
      op: false,
      postDay: getPostHour(),
      randomIdGeneratedByMe,
      catUrl: null,
      catWidth: null,
      catHeight: null,
    };
    if (form.allowCatImage) {
      const [cat] = await getCat();
      const { url: catUrl, width: catWidth, height: catHeight } = cat;
      newReply.catUrl = catUrl;
      newReply.catWidth = catWidth;
      newReply.catHeight = catHeight;
    }
    if (newReply.email === 'sage' || newReply.email === 'SAGE') {
      await addPost(newReply);
    } else {
      await addReplyAndBump(newReply, threadNumber!);
    }

    revalidatePath(`/[board]/[pageNumber]`, 'page');
    revalidatePath(`/[board]/catalog`, 'page');
    revalidatePath(`/[board]/res/[threadId]`, 'page');
    return { error: '' };
  } catch (error) {
    console.log(error);
    return {
      error:
        error instanceof Error
          ? error.message
          : 'Erro ao responder essa thread',
    };
  }
};
