import { ReactNode } from 'react';
import classes from './Centralizer.module.css';

type Props = { children: ReactNode };

const Centralizer = ({ children }: Props) => {
  return <div className={classes.centralize}>{children}</div>;
};

export default Centralizer;
