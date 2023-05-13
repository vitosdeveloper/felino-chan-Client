import { RefObject } from 'react';
import classes from './Input.module.css';

type Props = {
  type: string;
  refProp?: RefObject<HTMLInputElement>;
  placeholder: string;
  disabled: boolean;
  checked?: boolean;
  required?: boolean;
  name: string;
};

const Input = ({
  type,
  refProp,
  placeholder,
  name,
  disabled,
  checked,
  ...props
}: Props) => {
  return (
    <input
      id={name}
      name={name}
      className={classes.input}
      type={type}
      ref={refProp}
      placeholder={placeholder}
      disabled={disabled}
      checked={checked}
      defaultChecked={true}
      readOnly={checked}
      {...props}
    />
  );
};

export default Input;
