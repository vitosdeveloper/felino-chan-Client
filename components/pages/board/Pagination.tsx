import React from 'react';
import classes from './Links.module.css';
import pagClasses from './Pagination.module.css';
import Link from 'next/link';
type Props = { currentPage: number };

const Pagination = ({ currentPage }: Props) => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className={classes.links} style={{ marginTop: '.5rem' }}>
      {pages.map((page) => (
        <Link
          className={page === currentPage ? pagClasses.bold : pagClasses.normal}
          key={page}
          href={`/hw/${page}`}
        >
          [ {page} ]
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
