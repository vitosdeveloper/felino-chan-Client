'use client';
import Image from 'next/image';
import React from 'react';
import { Post } from '@/types/generalTypes';
import parseHtmlString from '@/lib/parseStringToJsx';
import classes from './ThreadCell.module.css';
import { useRouter } from 'next/navigation';
import { IBoards } from '@/utils/boards';

type Props = { thread: Post; board: IBoards };

const ThreadCell = ({ thread, board }: Props) => {
  const router = useRouter();
  const { catUrl, catWidth, catHeight, postContent, randomIdGeneratedByMe } =
    thread;
  return (
    <div
      onClick={() => {
        router.push(`/${board}/res/${randomIdGeneratedByMe}`);
      }}
      className={classes.cell}
    >
      <Image
        className={classes.image}
        src={catUrl!}
        width={catWidth}
        height={catHeight}
        alt=''
      />
      <p>{parseHtmlString(postContent, board)}</p>
    </div>
  );
};

export default ThreadCell;
