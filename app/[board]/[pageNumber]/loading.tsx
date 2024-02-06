import ThreadSkeleton from '@/app/components/loading-skeleton/ThreadSkeleton';
import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {};

const Loading = (props: Props) => {
  return <ThreadSkeleton />;
};

export default Loading;
