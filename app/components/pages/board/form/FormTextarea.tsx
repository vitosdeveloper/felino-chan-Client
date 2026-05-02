import { ChangeEvent } from 'react';
import classes from './Input.module.css';
import { useFormStatus } from 'react-dom';

type Props = {
  placeholder: string;
  name: string;
  required?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const FormTextarea = ({ placeholder, name, required, value, onChange }: Props) => {
  const { pending } = useFormStatus();

  return (
    <>
      <textarea
        name={name}
        className={classes.input}
        rows={5}
        placeholder={placeholder}
        disabled={pending}
        required={required}
        value={value}
        onChange={onChange}
      ></textarea>
    </>
  );
};

export default FormTextarea;
