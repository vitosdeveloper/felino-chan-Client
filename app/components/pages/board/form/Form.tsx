'use client';
import FormTextarea from './FormTextarea';
import Input from './Input';
import classes from './Form.module.css';
import Button from './Button';
import Reminder from './Reminder';
import Centralizer from '@/app/components/layout/Centralizer';
import { FormEvent, useRef, useState } from 'react';
import usePassword from '@/custom-hooks/usePassword';
import { setOneStorage } from '@/utils/handleLocalStorage';
import { useRouter } from 'next/navigation';

type Props = { op: boolean; threadNumber?: number };

const Form = ({ op, threadNumber }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const assuntoRef = useRef<HTMLInputElement>(null);
  const postContentRef = useRef<HTMLTextAreaElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const allowCatImageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { password, setPassword } = usePassword();

  const clearInputs = () => {
    if (
      emailRef.current instanceof HTMLInputElement &&
      assuntoRef.current instanceof HTMLInputElement &&
      postContentRef.current instanceof HTMLTextAreaElement
    ) {
      emailRef.current.value = '';
      assuntoRef.current.value = '';
      postContentRef.current.value = '';
    }
  };

  const userHasFilledRequiredInputs = () => {
    if (
      postContentRef.current instanceof HTMLTextAreaElement &&
      passwordRef.current instanceof HTMLInputElement &&
      postContentRef.current.value.length &&
      passwordRef.current.value.length
    ) {
      return true;
    }
    return false;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setOneStorage('felinoChanPassword', value);
  };

  const finishPosting = async () => {
    const pages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    setLoading(false);
    clearInputs();
    threadNumber && router.prefetch('res/' + threadNumber);
    pages.forEach((page) => router.prefetch('hw/' + page));
    router.push('hw/1#top');
    router.refresh();
  };

  const handleReply = async (e: FormEvent) => {
    e.preventDefault();
    if (userHasFilledRequiredInputs()) {
      try {
        setLoading(true);
        const email = emailRef.current?.value;
        const assunto = assuntoRef.current?.value;
        const postContent = postContentRef.current?.value;
        const password = passwordRef.current?.value;
        const allowCatImage = allowCatImageRef.current?.checked;

        const res = await fetch('/api/post/addReply', {
          method: 'POST',
          body: JSON.stringify({
            email,
            assunto,
            postContent,
            password,
            allowCatImage,
            threadNumber,
          }),
        });
        if (!res.ok) throw new Error('Error creating new Reply.');
        finishPosting();
        return;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }
  };

  const handleAddThread = async (e: FormEvent) => {
    e.preventDefault();
    if (userHasFilledRequiredInputs()) {
      try {
        setLoading(true);
        const email = emailRef.current?.value;
        const assunto = assuntoRef.current?.value;
        const postContent = postContentRef.current?.value;
        const password = passwordRef.current?.value;

        const res = await fetch('/api/post/addThread', {
          method: 'POST',
          body: JSON.stringify({ email, assunto, postContent, password }),
        });
        if (!res.ok) throw new Error('Error creating new Thread.');
        finishPosting();
      } catch (error) {
        throw new Error((error as Error).message);
      }
    }
  };

  return (
    <Centralizer>
      <form
        // action={op ? handleAddThread : handleReply}
        onSubmit={op ? handleAddThread : handleReply}
        className={classes.form}
      >
        <div className={classes.inputs}>
          <Input
            name='email'
            placeholder='E-mail / sage (Opcional)'
            type='text'
            refProp={emailRef}
            disabled={loading}
          />
          <Input
            name='assunto'
            placeholder='Assunto (Opcional)'
            type='text'
            refProp={assuntoRef}
            disabled={loading}
          />
          <FormTextarea
            name='postContent'
            placeholder='Post (Obrigatório)'
            refProp={postContentRef}
            disabled={loading}
            required
          />
          <Input
            name='password'
            placeholder='Senha (Obrigatório)'
            type='password'
            refProp={passwordRef}
            disabled={loading}
            required
            value={password}
            changeHandler={handlePasswordChange}
          />
          <div className={classes.checkboxContainer}>
            <input
              ref={allowCatImageRef}
              id='allowCatImage'
              name='allowCatImage'
              type='checkbox'
              disabled={op || loading}
              defaultChecked={true}
            />
            <label htmlFor='allowCatImage'>Random Cat Images</label>
          </div>
        </div>
        <Button disabled={loading}>{op ? 'Novo tópico' : 'Responder'}</Button>
      </form>
      <Reminder />
    </Centralizer>
  );
};

export default Form;
