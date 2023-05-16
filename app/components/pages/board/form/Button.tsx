import { ReactNode } from 'react';
import classes from './Button.module.css';

type Props = { children: ReactNode; disabled?: boolean };

const Button = ({ children, disabled }: Props) => {
  return (
    <button className={classes.button} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
