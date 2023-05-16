import { ChangeEvent, RefObject } from 'react';
import classes from './Input.module.css';

type Props = {
  type: string;
  refProp?: RefObject<HTMLInputElement>;
  placeholder: string;
  required?: boolean;
  name: string;
  disabled?: boolean;
  value?: string;
  changeHandler?: (value: string) => void;
};

const Input = ({
  type,
  refProp,
  placeholder,
  name,
  disabled,
  value,
  changeHandler,
}: Props) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (changeHandler) changeHandler(e.target.value);
  };
  return (
    <input
      id={name}
      name={name}
      className={classes.input}
      type={type}
      ref={refProp}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default Input;
