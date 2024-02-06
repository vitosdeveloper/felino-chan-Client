import PostsFromThisPage from '@/app/components/pages/board/PostsFromThisPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  description:
    'A board that contains a list of threads with random content and cat images',
};

const pages = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const HelloWorldPage = async ({
  params,
}: {
  params: { pageNumber: string };
}) => {
  const page = Number(params.pageNumber);
  metadata.title = `Hello, World! Página ${page}`;
  return <PostsFromThisPage page={page} />;
};

export default HelloWorldPage;

export async function generateStaticParams() {
  return pages.map((pageNumber) => ({ pageNumber }));
}
