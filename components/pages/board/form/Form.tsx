// 'use client';
import React from 'react';
import FormTextarea from './FormTextarea';
import Input from './Input';
import classes from './Form.module.css';
import Button from './Button';
import Reminder from './Reminder';
import {
  addPost,
  addReplyAndBump,
  addThread,
  getCat,
  getIdCountAndIncrementByOne,
  getPostHour,
} from '@/serverActions/actions';
import { isPost } from '@/lib/mongoHelper';
import { revalidatePath } from 'next/cache';

type Props = { op: boolean; threadNumber?: number };

const Form = ({ op, threadNumber }: Props) => {
  const loading = false;

  const addReply = async (data: FormData) => {
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
        const mountedThread = {
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

        if (isPost(mountedThread)) {
          if (
            mountedThread.email === 'sage' ||
            mountedThread.email === 'SAGE'
          ) {
            await addPost(mountedThread);
          } else {
            await addReplyAndBump(mountedThread, threadNumber!);
          }
        }
      } else {
        const randomIdGeneratedByMe = await getIdCountAndIncrementByOne();
        const mountedThread = {
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
        if (mountedThread.email === 'sage' || mountedThread.email === 'SAGE') {
          await addPost(mountedThread);
        } else {
          await addReplyAndBump(mountedThread, threadNumber!);
        }
      }
      revalidatePath('/hw/1#top');
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message || 'Error posting new reply.');
    }
  };

  return (
    <>
      <form action={op ? addThread : addReply} className={classes.form}>
        <div className={classes.inputs}>
          <Input
            name='email'
            placeholder='E-mail / sage (Opcional)'
            type='text'
            disabled={loading}
          />
          <Input
            name='assunto'
            placeholder='Assunto (Opcional)'
            type='text'
            disabled={loading}
          />
          <FormTextarea
            name='postContent'
            placeholder='Post (Obrigatório)'
            disabled={loading}
          />
          <Input
            name='password'
            placeholder='Senha (Obrigatório)'
            type='password'
            disabled={loading}
          />
          <div className={classes.checkboxContainer}>
            <Input
              name='allowCatImage'
              placeholder='Random Cat Images'
              type='checkbox'
              disabled={loading || op}
              checked={op ? true : undefined}
            />
            <label htmlFor='allowCatImage'>Random Cat Images</label>
          </div>
        </div>
        <Button>{op ? 'Novo tópico' : 'Responder'}</Button>
      </form>
      <Reminder />
    </>
  );
};

export default Form;
