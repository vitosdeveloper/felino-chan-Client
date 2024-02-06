import { ReactNode } from 'react';
import classes from './Button.module.css';
import { useFormStatus } from 'react-dom';

type Props = { children: ReactNode };

const Button = ({ children }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button className={classes.button} disabled={pending}>
      {pending ? 'Enviando...' : children}
    </button>
  );
};

export default Button;
