import { ReactNode } from 'react';
import classes from './MainLayout.module.css';

type Props = { children: ReactNode };

const MainLayout = ({ children }: Props) => {
  return <main className={classes.mainLayout}>{children}</main>;
};

export default MainLayout;
