import { ChangeEvent, RefObject } from 'react';
import classes from './Input.module.css';
import { useFormStatus } from 'react-dom';

type Props = {
  type: string;
  placeholder: string;
  required?: boolean;
  name: string;
  value?: string;
  changeHandler?: (value: string) => void;
  inputRef?: RefObject<HTMLInputElement>;
};

const Input = ({
  type,
  placeholder,
  name,
  value,
  changeHandler,
  inputRef,
}: Props) => {
  const { pending } = useFormStatus();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (changeHandler) changeHandler(e.target.value);
  };
  return (
    <input
      ref={inputRef}
      id={name}
      name={name}
      className={classes.input}
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={pending}
      onChange={handleInputChange}
    />
  );
};

export default Input;
