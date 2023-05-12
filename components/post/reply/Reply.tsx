'use client';
import { Post } from '@/types/generalTypes';
import { useState } from 'react';
import PostUserDetails from '../PostUserDetails';
import PostFileDetails from '../PostFileDetails';
import PostImage from '../PostImage';
import classes from './Reply.module.css';

type Props = { reply: Post };

const Reply = ({ reply }: Props) => {
  const [showImage, setShowImage] = useState<boolean>(true);

  const {
    _id,
    board,
    email,
    assunto,
    postContent,
    reply: replyTo,
    op,
    randomIdGeneratedByMe,
    catUrl,
    catWidth,
    catHeight,
    postDay,
  } = reply;

  return (
    <div className={classes.reply}>
      <div>
        <PostUserDetails
          assunto={assunto}
          email={email}
          id={_id}
          postDay={postDay}
          postNumber={String(randomIdGeneratedByMe)}
          op={op}
        />
      </div>
      {catUrl && (
        <div>
          <PostFileDetails
            showImage={showImage}
            hideImage={() => setShowImage((prev) => !prev)}
            width={catWidth}
            height={catHeight}
            catUrl={catUrl}
          />
        </div>
      )}
      <div>
        {catUrl && showImage && (
          <PostImage src={catUrl} width={catWidth} height={catHeight} />
        )}
        <p
          dangerouslySetInnerHTML={{
            __html: postContent,
          }}
        />
      </div>
    </div>
  );
};

export default Reply;
