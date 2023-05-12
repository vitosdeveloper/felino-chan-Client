import React from 'react';
import Reply from './Reply';
import { isPost } from '@/lib/mongoHelper';

type Props = {
  replys: Promise<{ _id: string; password?: string | undefined }[]>;
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
