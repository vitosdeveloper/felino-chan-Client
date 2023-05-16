import Image from 'next/image';
import React from 'react';
import { Post } from '@/types/generalTypes';
import parseHtmlString from '@/lib/parseStringToJsx';
import classes from './ThreadCell.module.css';
import Link from 'next/link';

type Props = { thread: Post };

const ThreadCell = ({ thread }: Props) => {
  const { catUrl, catWidth, catHeight, postContent, randomIdGeneratedByMe } =
    thread;
  return (
    <Link href={`/res/${randomIdGeneratedByMe}`} className={classes.cell}>
      <Image
        className={classes.image}
        src={catUrl!}
        width={catWidth}
        height={catHeight}
        alt=''
      />
      <p>{parseHtmlString(postContent)}</p>
    </Link>
  );
};

export default ThreadCell;
