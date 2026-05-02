import React, { PropsWithChildren } from 'react';
import Skeleton from 'react-loading-skeleton';

type Props = {};

const ThreadSkeleton = (props: Props) => {
  return (
    <div>
      <ThreadSkeletonUnity>
        <ReplySkeletonUnity />
        <ReplySkeletonUnity />
      </ThreadSkeletonUnity>

      <ThreadSkeletonUnity>
        <ReplySkeletonUnity />
        <ReplySkeletonUnity />
        <ReplySkeletonUnity />
        <ReplySkeletonUnity />
      </ThreadSkeletonUnity>

      <ThreadSkeletonUnity></ThreadSkeletonUnity>

      <ThreadSkeletonUnity>
        <ReplySkeletonUnity />
      </ThreadSkeletonUnity>

      <ThreadSkeletonUnity></ThreadSkeletonUnity>

      <ThreadSkeletonUnity></ThreadSkeletonUnity>

      <ThreadSkeletonUnity>
        <ReplySkeletonUnity />
        <ReplySkeletonUnity />
      </ThreadSkeletonUnity>
    </div>
  );
};

export default ThreadSkeleton;

export const ThreadSkeletonUnity = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Skeleton
        baseColor='var(--inputBgColor)'
        highlightColor='var(--glassBg)'
        style={{ maxWidth: 346, maxHeight: 10 }}
      />
      <Skeleton
        inline
        baseColor='var(--inputBgColor)'
        highlightColor='var(--glassBg)'
        style={{
          maxWidth: 250,
          height: 180,
          marginRight: '.75rem',
          float: 'left',
          borderRadius: '8px'
        }}
        direction='rtl'
      />
      <Skeleton
        inline
        baseColor='var(--inputBgColor)'
        highlightColor='var(--glassBg)'
        style={{ maxWidth: 276, marginRight: 10, maxHeight: 10 }}
      />
      <Skeleton
        inline
        baseColor='var(--inputBgColor)'
        highlightColor='var(--glassBg)'
        style={{ maxWidth: 70, maxHeight: 10 }}
      />
      <br />
      <Skeleton
        baseColor='var(--inputBgColor)'
        highlightColor='var(--glassBg)'
        style={{ maxWidth: 746, maxHeight: 10 }}
      />
      <Skeleton
        baseColor='var(--inputBgColor)'
        highlightColor='var(--glassBg)'
        style={{ maxWidth: 686, maxHeight: 10 }}
      />
      {children}
    </div>
  );
};

export const ReplySkeletonUnity = () => {
  return (
    <div
      style={{
        background: 'var(--glassBg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--glassBorder)',
        padding: '.75rem',
        borderRadius: '8px',
        marginTop: '.5rem',
        display: 'flow-root',
        maxWidth: 650,
      }}
    >
      <Skeleton
        baseColor='var(--inputBgColor)'
        highlightColor='var(--headerBgColor)'
        style={{ maxWidth: 276, maxHeight: 10 }}
      />
      <Skeleton
        baseColor='var(--inputBgColor)'
        highlightColor='var(--headerBgColor)'
        style={{ maxWidth: 346, maxHeight: 10 }}
      />
      <Skeleton
        inline
        baseColor='var(--inputBgColor)'
        highlightColor='var(--headerBgColor)'
        style={{
          maxWidth: 250,
          height: 180,
          marginRight: '.75rem',
          float: 'left',
          borderRadius: '8px'
        }}
        direction='rtl'
      />
      <Skeleton
        baseColor='var(--inputBgColor)'
        highlightColor='var(--headerBgColor)'
        style={{ maxWidth: 70, maxHeight: 10 }}
      />
      <Skeleton
        baseColor='var(--inputBgColor)'
        highlightColor='var(--headerBgColor)'
        style={{ maxWidth: 346, maxHeight: 10 }}
      />
      <Skeleton
        baseColor='var(--inputBgColor)'
        highlightColor='var(--headerBgColor)'
        style={{ maxWidth: 286, maxHeight: 10 }}
      />
      <Skeleton
        baseColor='var(--inputBgColor)'
        highlightColor='var(--headerBgColor)'
        style={{ maxWidth: 146, maxHeight: 10, marginBottom: '1rem' }}
      />
    </div>
  );
};
