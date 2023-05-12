import { RefObject } from 'react';
import classes from './Input.module.css';

type Props = {
  refProp: RefObject<HTMLTextAreaElement>;
  placeholder: string;
  disabled: boolean;
};

const FormTextarea = ({ refProp, placeholder, disabled }: Props) => {
  return (
    <>
      <textarea
        className={classes.input}
        rows={5}
        ref={refProp}
        placeholder={placeholder}
        disabled={disabled}
      ></textarea>
    </>
  );
};

export default FormTextarea;
