'use server';

import {
  addPost,
  getCat,
  getIdCountAndIncrementByOne,
  getPostHour,
} from '@/helpers/serverActionsHelper';
import { isPost, removeOldThreadsAndItsReplys } from '@/lib/mongoHelper';
import { IBoards } from '@/utils/boards';
import { revalidatePath } from 'next/cache';

export const handleAddThread = async (
  state: { error: string },
  formData: FormData,
  board: IBoards
) => {
  try {
    const thread = {
      email: formData.get('email'),
      assunto: formData.get('assunto'),
      postContent: formData.get('postContent'),
      password: formData.get('password'),
      allowCatImage: !!formData.get('allowCatImage'),
    };
    const { email, assunto, postContent, password, allowCatImage } = thread;

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

    let catUrl = null;
    let catWidth = null;
    let catHeight = null;

    if (allowCatImage) {
      const [cat] = await getCat();
      catUrl = cat.url;
      catWidth = cat.width;
      catHeight = cat.height;
    }

    const randomIdGeneratedByMe = await getIdCountAndIncrementByOne();
    const mountedThread = {
      ...form,
      board,
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
      await removeOldThreadsAndItsReplys(board);
      revalidatePath(`/${board}/[pageNumber]`, 'page');
      revalidatePath(`/${board}/catalog`, 'page');
      return { error: '' };
    }
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
