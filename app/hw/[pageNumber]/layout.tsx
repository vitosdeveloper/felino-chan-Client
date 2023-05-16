import Centralizer from '@/app/components/layout/Centralizer';
import Footer from '@/app/components/layout/Footer';
import Hr from '@/app/components/layout/Hr';
import Links from '@/app/components/pages/board/Links';
import Pagination from '@/app/components/pages/board/Pagination';
import Form from '@/app/components/pages/board/form/Form';
import MediumTitle from '@/app/components/text/MediumTitle';
import Image from 'next/image';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pageNumber: string };
}) {
  const page = Number(params.pageNumber);
  return (
    <>
      <Form op={true} />
      <Hr />
      <Links destination='bottom' />
      <Hr />
      {children}
      <Pagination currentPage={page} />
      <Hr />
      <Links destination='top' />
    </>
  );
}
