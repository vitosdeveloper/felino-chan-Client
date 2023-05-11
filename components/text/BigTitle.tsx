import { ReactNode } from 'react';
import classes from './BigTitle.module.css';

type Props = { children: ReactNode };

const BigTitle = ({ children }: Props) => {
  return <h1 className={classes.bigTitle}>{children}</h1>;
};

export default BigTitle;
