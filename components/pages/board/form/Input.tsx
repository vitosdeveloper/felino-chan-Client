import { RefObject } from 'react';
import classes from './Input.module.css';

type Props = {
  type: string;
  refProp: RefObject<HTMLInputElement>;
  placeholder: string;
  id?: string;
  disabled: boolean;
  checked?: boolean;
  required?: boolean;
};

const Input = ({
  type,
  refProp,
  placeholder,
  id,
  disabled,
  checked,
  ...props
}: Props) => {
  return (
    <input
      id={id}
      className={classes.input}
      type={type}
      ref={refProp}
      placeholder={placeholder}
      disabled={disabled}
      checked={checked}
      readOnly={checked}
      {...props}
    />
  );
};

export default Input;
