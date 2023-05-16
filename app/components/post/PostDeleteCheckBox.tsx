'use client';
import { memo, useRef, useState } from 'react';
import Input from '../pages/board/form/Input';
import Button from '../pages/board/form/Button';
import classes from './PostDeleteCheckBox.module.css';
import { removePost } from '@/helpers/serverActions';
import { useRouter } from 'next/navigation';

type Props = { id: string };

const PostDeleteCheckBox = ({ id }: Props) => {
  const [showDeleteInput, setShowDeleteInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (passwordRef.current instanceof HTMLInputElement) {
      await removePost(id, passwordRef.current.value);
      setLoading(false);
      router.replace('/hw/1');
      router.refresh();
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
        <form
          className={classes.form}
          onSubmit={() => setLoading(true)}
          action={handleDelete}
        >
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
