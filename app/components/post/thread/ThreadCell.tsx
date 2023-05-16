'use client';
import Image from 'next/image';
import React from 'react';
import { Post } from '@/types/generalTypes';
import parseHtmlString from '@/lib/parseStringToJsx';
import classes from './ThreadCell.module.css';
import { useRouter } from 'next/navigation';

type Props = { thread: Post };

const ThreadCell = ({ thread }: Props) => {
  const { catUrl, catWidth, catHeight, postContent, randomIdGeneratedByMe } =
    thread;
  const route = useRouter();

  const handleClick = () => {
    route.push(`/res/${randomIdGeneratedByMe}`);
  };
  return (
    <div onClick={handleClick} className={classes.cell}>
      <Image
        className={classes.image}
        src={catUrl!}
        width={catWidth}
        height={catHeight}
        alt=''
      />
      <p>{parseHtmlString(postContent)}</p>
    </div>
  );
};

export default ThreadCell;
