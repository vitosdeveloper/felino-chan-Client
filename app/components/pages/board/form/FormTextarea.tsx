import { RefObject } from 'react';
import classes from './Input.module.css';
import { useFormStatus } from 'react-dom';

type Props = {
  refProp?: RefObject<HTMLTextAreaElement>;
  placeholder: string;
  name: string;
  required?: boolean;
};

const FormTextarea = ({ refProp, placeholder, name, required }: Props) => {
  const { pending } = useFormStatus();

  return (
    <>
      <textarea
        name={name}
        className={classes.input}
        rows={5}
        ref={refProp}
        placeholder={placeholder}
        disabled={pending}
        required={required}
      ></textarea>
    </>
  );
};

export default FormTextarea;
