import { ReactNode } from 'react';
import classes from './MediumTitle.module.css';

type Props = { children: ReactNode };

const MediumTitle = ({ children }: Props) => {
  return <h2 className={classes.mediumTitle}>{children}</h2>;
};

export default MediumTitle;
