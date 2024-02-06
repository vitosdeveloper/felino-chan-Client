'use client';
import FormTextarea from './FormTextarea';
import Input from './Input';
import classes from './Form.module.css';
import Button from './Button';
import Reminder from './Reminder';
import Centralizer from '@/app/components/layout/Centralizer';
import usePassword from '@/custom-hooks/usePassword';
import { setOneStorage } from '@/utils/handleLocalStorage';
import { handleAddThread } from '@/app/server-actions/handleAddThread.';
import { handleReply } from '@/app/server-actions/handleReply';
import { useFormState } from 'react-dom';
import CatInput from './CatInput';
import { useEffect, useRef } from 'react';
import { IBoards } from '@/utils/boards';

type Props = { op: boolean; threadNumber?: number; board: IBoards };

const initialState = {
  error: '',
};

const Form = ({ op, threadNumber, board }: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const assuntoRef = useRef<HTMLInputElement>(null);
  const postContentRef = useRef<HTMLTextAreaElement>(null);

  const { password, setPassword } = usePassword();
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setOneStorage('felinoChanPassword', value);
  };
  const handleReplyAction = (state: { error: string }, formData: FormData) => {
    state.error = '';
    return handleReply(state, formData, threadNumber, board);
  };
  const handleThreadAction = (state: { error: string }, formData: FormData) => {
    state.error = '';
    return handleAddThread(state, formData, board);
  };

  const [state, formAction] = useFormState(
    op ? handleThreadAction : handleReplyAction,
    initialState
  );
  useEffect(() => {
    if (
      !state.error &&
      emailRef.current instanceof HTMLInputElement &&
      assuntoRef.current instanceof HTMLInputElement &&
      postContentRef.current instanceof HTMLTextAreaElement &&
      postContentRef.current.value
    ) {
      emailRef.current.value = '';
      assuntoRef.current.value = '';
      postContentRef.current.value = '';
      op
        ? document.querySelector('#top')?.scrollIntoView({ behavior: 'smooth' })
        : document
            .querySelector('#bottom')
            ?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state, op]);

  return (
    <Centralizer>
      <form action={formAction} className={classes.form}>
        <div className={classes.inputs}>
          <Input
            name='email'
            placeholder='E-mail / sage (Opcional)'
            type='text'
            inputRef={emailRef}
          />
          <Input
            inputRef={assuntoRef}
            name='assunto'
            placeholder='Assunto (Opcional)'
            type='text'
          />
          <FormTextarea
            refProp={postContentRef}
            name='postContent'
            placeholder='Post (Obrigatório)'
            required
          />
          <Input
            name='password'
            placeholder='Senha (Obrigatório)'
            type='password'
            required
            value={password}
            changeHandler={handlePasswordChange}
          />
          <div className={classes.checkboxContainer}>
            <CatInput op={op} />
          </div>
        </div>
        <Button>{op ? 'Novo tópico' : 'Responder'}</Button>
      </form>
      {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
      <Reminder />
    </Centralizer>
  );
};

export default Form;
