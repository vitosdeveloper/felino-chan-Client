import Hr from '@/app/components/layout/Hr';
import {
  ReplySkeletonUnity,
  ThreadSkeletonUnity,
} from '@/app/components/loading-skeleton/ThreadSkeleton';
import Links from '@/app/components/pages/board/Links';
import Form from '@/app/components/pages/board/form/Form';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {};

const Loading = (props: Props) => {
  return (
    <>
      <Form op={false} threadNumber={666} />
      <Hr />
      <Links destination='bottom' />
      <Hr />
      <ThreadSkeletonUnity>
        <ReplySkeletonUnity />
        <ReplySkeletonUnity />
      </ThreadSkeletonUnity>
      <Hr />
    </>
  );
};

export default Loading;
