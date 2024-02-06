import Centralizer from '@/app/components/layout/Centralizer';
import Footer from '@/app/components/layout/Footer';
import MediumTitle from '@/app/components/text/MediumTitle';
import { IBoards } from '@/utils/boards';
import { boardsTitle } from '@/utils/boardsTitle';
import Image from 'next/image';
import MainLayout from '../components/layout/MainLayout';
import Header from '../components/layout/Header';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pageNumber: string; board: IBoards };
}) {
  return (
    <>
      <Header board={params.board} />
      <MainLayout>
        <Centralizer>
          <Image
            src='/dog.jpg'
            width={300}
            height={100}
            alt='a really cute cat picture'
            priority
          />
          <MediumTitle>{boardsTitle[params.board]}</MediumTitle>
        </Centralizer>
        {children}
        <Footer />
      </MainLayout>
    </>
  );
}
