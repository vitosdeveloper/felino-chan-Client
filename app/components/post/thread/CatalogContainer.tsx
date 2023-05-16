import React, { ReactNode } from 'react';
import classes from './CatalogContainer.module.css';
type Props = { children: ReactNode };

const CatalogContainer = ({ children }: Props) => {
  return <div className={classes.catalogContainer}>{children}</div>;
};

export default CatalogContainer;
