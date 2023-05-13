import Centralizer from '@/components/layout/Centralizer';
import MediumTitle from '@/components/text/MediumTitle';
import Image from 'next/image';
import React from 'react';
import Form from './form/Form';
import Hr from '@/components/layout/Hr';
import Links from './Links';
import Pagination from './Pagination';
import PostsFromThisPage from './PostsFromThisPage';
import Footer from '@/components/layout/Footer';

type Props = { page: number };

const Board = ({ page }: Props) => {
  return (
    <>
      <Centralizer>
        <Image
          src='/dog.jpg'
          width={300}
          height={100}
          alt='a really cute cat picture'
          priority
        />
        <MediumTitle>HW - Hello World</MediumTitle>
        <Form op={true} />
      </Centralizer>
      <Hr />
      <Links destination='bottom' />
      <Hr />
      <PostsFromThisPage page={page} />
      <Links destination='top' />
      <Pagination currentPage={page} />
      <Footer />
    </>
  );
};

export default Board;
