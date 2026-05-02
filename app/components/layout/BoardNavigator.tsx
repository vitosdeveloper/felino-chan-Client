'use client';
import { usePathname, useRouter } from 'next/navigation';
import { visibleBoards } from '@/utils/boardsTitle';
import classes from './BoardNavigator.module.css';
import { useEffect, useState, TouchEvent } from 'react';

const BoardNavigator = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  if (!pathname || pathname === '/') return null;

  // Find current board
  const boardMatch = pathname.split('/')[1];
  const currentIndex = visibleBoards.indexOf(boardMatch);

  if (currentIndex === -1) return null; // Not in a valid board

  const prevBoard = currentIndex > 0 ? visibleBoards[currentIndex - 1] : null;
  const nextBoard = currentIndex < visibleBoards.length - 1 ? visibleBoards[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevBoard) router.push(`/${prevBoard}/1`);
  };

  const handleNext = () => {
    if (nextBoard) router.push(`/${nextBoard}/1`);
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && nextBoard) {
      handleNext();
    }
    if (isRightSwipe && prevBoard) {
      handlePrev();
    }
  };

  return (
    <div 
      className={classes.swipeContainer}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {prevBoard && (
        <button onClick={handlePrev} className={`${classes.navButton} ${classes.leftBtn}`} title={`Go to /${prevBoard}/`}>
          <span>&#10094;</span>
          <span className={classes.boardName}>{prevBoard}</span>
        </button>
      )}
      {nextBoard && (
        <button onClick={handleNext} className={`${classes.navButton} ${classes.rightBtn}`} title={`Go to /${nextBoard}/`}>
          <span className={classes.boardName}>{nextBoard}</span>
          <span>&#10095;</span>
        </button>
      )}
    </div>
  );
};

export default BoardNavigator;
