import { FormEvent, memo, useRef, useState } from 'react';
import Input from '../pages/board/form/Input';
import Button from '../pages/board/form/Button';
import classes from './PostDeleteCheckBox.module.css';

type Props = { id: string };

const PostDeleteCheckBox = ({ id }: Props) => {
  const [showDeleteInput, setShowDeleteInput] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loading = false;
  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    console.log(id);
  };
  return (
    <div className={classes.removePost}>
      {showDeleteInput && (
        <form className={classes.form} onSubmit={handleDelete}>
          <Input
            type='password'
            placeholder='Senha'
            disabled={loading}
            refProp={passwordRef}
            required
          />
          <Button>Deletar</Button>
        </form>
      )}
      <input
        type='checkbox'
        onChange={(e) => setShowDeleteInput(e.target.checked)}
      />
    </div>
  );
};

export default memo(PostDeleteCheckBox);
