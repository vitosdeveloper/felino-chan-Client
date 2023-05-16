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
      <Centralizer>
        <Image
          src='/dog.jpg'
          width={300}
          height={100}
          alt='a really cute cat picture'
          priority
        />
        <MediumTitle>HW - Hello World</MediumTitle>
      </Centralizer>
      {children}
      <Footer />
    </>
  );
}
