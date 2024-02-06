import Image from 'next/image';
import React from 'react';
import { Post } from '@/types/generalTypes';
import parseHtmlString from '@/lib/parseStringToJsx';
import classes from './ThreadCell.module.css';
// import { useRouter } from 'next/navigation';
import { IBoards } from '@/utils/boards';
import Link from 'next/link';

type Props = { thread: Post; board: IBoards };

const ThreadCell = ({ thread, board }: Props) => {
  const { catUrl, catWidth, catHeight, postContent, randomIdGeneratedByMe } =
    thread;
  return (
    <Link
      href={`/${board}/res/${randomIdGeneratedByMe}`}
      className={classes.cell}
    >
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
