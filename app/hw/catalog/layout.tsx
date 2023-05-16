import Centralizer from '@/app/components/layout/Centralizer';
import Footer from '@/app/components/layout/Footer';
import Hr from '@/app/components/layout/Hr';
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
  const page = Number(params.pageNumber);
  return (
    <>
      <Links destination='bottom' catalog />
      {children}
      <Links destination='top' catalog />
    </>
  );
}
