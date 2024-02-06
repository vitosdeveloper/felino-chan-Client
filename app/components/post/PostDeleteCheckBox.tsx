'use client';
import { FormEvent, memo, useRef, useState } from 'react';
import Input from '../pages/board/form/Input';
import Button from '../pages/board/form/Button';
import classes from './PostDeleteCheckBox.module.css';
import { handleDelete } from '@/app/server-actions/handleDelete';

type Props = { id: string; postNumber: string };

const PostDeleteCheckBox = ({ id, postNumber }: Props) => {
  const [showDeleteInput, setShowDeleteInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
          action={(formData: FormData) =>
            handleDelete(formData, id, postNumber)
          }
        >
          <Input name='delete' type='password' placeholder='Senha' required />
          <Button>Deletar</Button>
        </form>
      )}
    </div>
  );
};

export default memo(PostDeleteCheckBox);
