import Centralizer from '@/app/components/layout/Centralizer';
import Footer from '@/app/components/layout/Footer';
import Links from '@/app/components/pages/board/Links';
import MediumTitle from '@/app/components/text/MediumTitle';
import Image from 'next/image';

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pageNumber: string };
}) {
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
        <MediumTitle>HW - Hello World</MediumTitle>{' '}
      </Centralizer>
      {children}
      <Links destination='top' />
      <Footer />
    </>
  );
}
