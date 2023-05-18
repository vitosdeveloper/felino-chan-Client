'use client';
import { FormEvent, memo, useRef, useState } from 'react';
import Input from '../pages/board/form/Input';
import Button from '../pages/board/form/Button';
import classes from './PostDeleteCheckBox.module.css';
import { useRouter } from 'next/navigation';

type Props = { id: string; postNumber: string };

const PostDeleteCheckBox = ({ id, postNumber }: Props) => {
  const [showDeleteInput, setShowDeleteInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDelete = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (passwordRef.current instanceof HTMLInputElement) {
        setLoading(true);
        const pages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        const res = await fetch('/api/post/removePost', {
          method: 'POST',
          body: JSON.stringify({
            password: passwordRef.current.value,
            id,
            postNumber,
          }),
        });
        console.log(res);

        if (!res.ok)
          throw new Error(
            'Wrong password or something went wrong deleting the post #' +
              id +
              '.'
          );
        setLoading(false);
        id && router.prefetch('res/' + id);
        pages.forEach((page) => router.prefetch('hw/' + page));
        router.push('hw/1#top');
        router.refresh();
        return;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      return new Error(
        (error as Error).message ||
          'Something went wrong while deleting the post #' + id
      );
    }
  };

  return (
    <div className={classes.removePost}>
      <input
        className={classes.test}
        type='checkbox'
        onChange={(e) => setShowDeleteInput(e.target.checked)}
      />
      {showDeleteInput && (
        <form className={classes.form} onSubmit={handleDelete}>
          <Input
            name='delete'
            type='password'
            placeholder='Senha'
            disabled={loading}
            refProp={passwordRef}
            required
          />
          <Button disabled={loading}>Deletar</Button>
        </form>
      )}
    </div>
  );
};

export default memo(PostDeleteCheckBox);
