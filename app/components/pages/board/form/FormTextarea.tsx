import { RefObject } from 'react';
import classes from './Input.module.css';

type Props = {
  refProp?: RefObject<HTMLTextAreaElement>;
  placeholder: string;
  disabled?: boolean;
  name: string;
  required?: boolean;
};

const FormTextarea = ({
  refProp,
  placeholder,
  disabled,
  name,
  required,
}: Props) => {
  return (
    <>
      <textarea
        name={name}
        className={classes.input}
        rows={5}
        ref={refProp}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      ></textarea>
    </>
  );
};

export default FormTextarea;
