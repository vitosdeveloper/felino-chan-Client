import Image from 'next/image';
import classes from './PostImage.module.css';
import { useState } from 'react';

type Props = { src: string; width: number; height: number };

const PostImage = ({ src, width, height }: Props) => {
  const [big, setBig] = useState(false);
  const sizes = {
    width: big ? width : 150,
    height: big ? height : 150,
  };
  return (
    <Image
      className={big ? classes.bigImage : classes.imageContainer}
      onClick={() => setBig((prev) => !prev)}
      src={src}
      {...sizes}
      alt='cat image'
      priority
    />
  );
};

export default PostImage;
