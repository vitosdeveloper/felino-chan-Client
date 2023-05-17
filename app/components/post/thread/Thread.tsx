'use client';
import { Post } from '@/types/generalTypes';
import { ReactNode } from 'react';
import PostFileDetails from '../PostFileDetails';
import PostImage from '../PostImage';
import PostUserDetails from '../PostUserDetails';
import classes from '../General.module.css';
import Hr from '@/app/components/layout/Hr';
import Link from 'next/link';
import parseHtmlString from '@/lib/parseStringToJsx';
import HiddenPost from '../HiddenPost';
import useHidden from '@/custom-hooks/useHidden';

type Props = {
  from: 'outside' | 'inside';
  thread: Post;
  children: ReactNode;
};

const Thread = ({ from, thread, children }: Props) => {
  const {
    _id,
    email,
    assunto,
    postContent,
    op,
    randomIdGeneratedByMe,
    catUrl,
    catWidth,
    catHeight,
    postDay,
  } = thread;

  const { handleShowState: handleShowPostState, show: showPost } = useHidden(
    _id,
    randomIdGeneratedByMe,
    'hiddenPosts'
  );

  const { handleShowState: handleShowImageState, show: showImage } = useHidden(
    _id,
    randomIdGeneratedByMe,
    'hiddenImages'
  );

  if (!showPost) {
    return (
      <HiddenPost
        assunto={assunto}
        email={email}
        id={_id}
        postDay={postDay}
        from={from}
        randomIdGeneratedByMe={randomIdGeneratedByMe}
        op={op}
        handleShowPost={handleShowPostState}
      />
    );
  }

  return (
    <div>
      <div id={String(randomIdGeneratedByMe)}>
        <div className={classes.fileOrUserDetails}>
          <PostFileDetails
            showImage={showImage}
            hideImage={handleShowImageState}
            handleShowPost={handleShowPostState}
            width={catWidth}
            height={catHeight}
            catUrl={catUrl}
          />
        </div>
        {catUrl && showImage && (
          <PostImage src={catUrl} width={catWidth} height={catHeight} />
        )}
        <div className={classes.fileOrUserDetails}>
          <PostUserDetails
            assunto={assunto}
            email={email}
            id={_id}
            postDay={postDay}
            postNumber={String(randomIdGeneratedByMe)}
            from={from}
            op={op}
          />
          <div>{parseHtmlString(postContent)}</div>
        </div>
      </div>
      {children}
      <Hr />
      {from === 'inside' && (
        <span>
          [<Link href='/hw/1'>Voltar</Link>]
        </span>
      )}
    </div>
  );
};

export default Thread;
