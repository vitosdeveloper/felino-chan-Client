import Board from '@/components/pages/board/Board';
import { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    'A board that contains a list of threads with random content and cat images',
};

// export const dynamicParams = false;

// export const generateStaticParams = async () => {
//   const pages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
//   return pages.map((page) => ({ pageNumber: page }));
// };

const HelloWorldPage = ({ params }: { params: { pageNumber: string } }) => {
  const pages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  if (pages.includes(params.pageNumber)) {
    const page = Number(params.pageNumber);
    metadata.title = `Hello, World! Página ${page}`;
    return <Board page={page} />;
  }
  return <>404 boy......</>;
};

export default HelloWorldPage;
