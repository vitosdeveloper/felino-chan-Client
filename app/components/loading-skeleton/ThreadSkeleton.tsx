import React, { PropsWithChildren } from 'react';
import Skeleton from 'react-loading-skeleton';
import Hr from '../layout/Hr';

type Props = {};

const ThreadSkeleton = (props: Props) => {
  return (
    <div>
      <ThreadSkeletonUnity>
        <ReplySkeletonUnity />
        <ReplySkeletonUnity />
      </ThreadSkeletonUnity>
      <Hr />

      <ThreadSkeletonUnity>
        <ReplySkeletonUnity />
        <ReplySkeletonUnity />
        <ReplySkeletonUnity />
        <ReplySkeletonUnity />
      </ThreadSkeletonUnity>
      <Hr />

      <ThreadSkeletonUnity></ThreadSkeletonUnity>
      <Hr />

      <ThreadSkeletonUnity>
        <ReplySkeletonUnity />
      </ThreadSkeletonUnity>
      <Hr />

      <ThreadSkeletonUnity></ThreadSkeletonUnity>
      <Hr />

      <ThreadSkeletonUnity></ThreadSkeletonUnity>
      <Hr />

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
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 346, maxHeight: 10 }}
      />
      <Skeleton
        inline
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{
          maxWidth: 250,
          height: 180,
          marginRight: '.75rem',
          float: 'left',
        }}
        direction='rtl'
      />
      <Skeleton
        inline
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 276, marginRight: 10, maxHeight: 10 }}
      />
      <Skeleton
        inline
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 70, maxHeight: 10 }}
      />
      <br />
      <Skeleton
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 746, maxHeight: 10 }}
      />
      <Skeleton
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
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
        background: 'var(--replyBgColor)',
        backgroundImage: 'var(--replyBgTexture)',
        padding: '.75rem',
        borderRadius: '8px',
        marginTop: '.5rem',
        display: 'flow-root',
        maxWidth: 650,
      }}
    >
      <Skeleton
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 276, maxHeight: 10 }}
      />
      <Skeleton
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 346, maxHeight: 10 }}
      />
      <Skeleton
        inline
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{
          maxWidth: 250,
          height: 180,
          marginRight: '.75rem',
          float: 'left',
        }}
        direction='rtl'
      />
      <Skeleton
        // inline
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 70, maxHeight: 10 }}
      />
      {/* <br /> */}
      <Skeleton
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 346, maxHeight: 10 }}
      />
      <Skeleton
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 286, maxHeight: 10 }}
      />
      <Skeleton
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 146, maxHeight: 10, marginBottom: '1rem' }}
      />
    </div>
  );
};
