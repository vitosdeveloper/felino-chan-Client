'use client';
import CatalogContainer from '@/app/components/post/thread/CatalogContainer';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

type Props = {};

const Loading = (props: Props) => {
  const generateNumber = () =>
    Math.floor(Math.random() * (250 - 188 + 1)) + 188;
  const arr = Array.from({ length: 18 }, (_, i) => ({
    i,
    imgHeight: generateNumber(),
  }));

  return (
    <CatalogContainer>
      {arr.map(({ i, imgHeight }) => (
        <SkeletonThreadCell key={i} imgHeight={imgHeight} />
      ))}
    </CatalogContainer>
  );
};

export default Loading;

const SkeletonThreadCell = ({ imgHeight = 188 }: { imgHeight?: number }) => {
  return (
    <div
      style={{
        overflowY: 'auto',
        height: '320px',
        width: '280px',
        padding: '1rem',
        borderRadius: '5px',
        background: 'var(--replyBgColor)',
        backgroundImage: 'var(--replyBgTexture)',
        boxShadow: '6px 6px 6px rgba(50, 50, 50, 0.4)',
        flexDirection: 'column',
      }}
    >
      <Skeleton
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 248, height: imgHeight, marginBottom: '1rem' }}
      />
      <Skeleton
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 276, maxHeight: 10 }}
      />
      <Skeleton
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 206, maxHeight: 10 }}
      />
      <Skeleton
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 196, maxHeight: 10 }}
      />
      <Skeleton
        baseColor='var(--linkHoverColor)'
        highlightColor='var(--linkColor)'
        style={{ maxWidth: 216, maxHeight: 10 }}
      />
    </div>
  );
};
