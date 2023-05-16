'use client';
import FormTextarea from './FormTextarea';
import Input from './Input';
import classes from './Form.module.css';
import Button from './Button';
import Reminder from './Reminder';
import Centralizer from '@/app/components/layout/Centralizer';
import { ChangeEventHandler, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { addReply, addThread } from '@/helpers/serverActions';
import usePassword from '@/custom-hooks/usePassword';
import { setStoragePassword } from '@/utils/handleLocalStorage';

type Props = { op: boolean; threadNumber?: number };

export const dynamic = 'force-dynamic';

const Form = ({ op, threadNumber }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const assuntoRef = useRef<HTMLInputElement>(null);
  const postContentRef = useRef<HTMLTextAreaElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
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

  const finishPosting = () => {
    clearInputs();
    router.replace('/hw/1');
    router.refresh();
    setLoading(false);
  };

  const handleReply = async (formData: FormData) => {
    if (userHasFilledRequiredInputs()) {
      setLoading(true);
      await addReply(formData, threadNumber as number);
      finishPosting();
    }
  };

  const handleAddThread = async (formData: FormData) => {
    if (userHasFilledRequiredInputs()) {
      await addThread(formData);
      finishPosting();
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setStoragePassword('felinoChanPassword', value);
  };

  return (
    <Centralizer>
      <form
        action={op ? handleAddThread : handleReply}
        onSubmit={() => setLoading(true)}
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
