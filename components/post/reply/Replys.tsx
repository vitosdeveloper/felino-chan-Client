import React from 'react';
import Reply from './Reply';
import { isPost } from '@/lib/mongoHelper';
import { Post } from '@/types/generalTypes';

type Props = {
  replys: Promise<(Post | undefined)[]>;
};

const Replys = ({ replys }: Props) => {
  return (
    <>
      {replys.then((r) =>
        r.map((reply) => {
          if (isPost(reply)) {
            return <Reply key={reply._id} reply={reply} />;
          }
        })
      )}
    </>
  );
};

export default Replys;
