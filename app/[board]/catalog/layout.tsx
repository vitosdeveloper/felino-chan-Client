import Links from '@/app/components/pages/board/Links';
import { IBoards } from '@/utils/boards';

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pageNumber: string; board: IBoards };
}) {
  return (
    <>
      <Links destination='bottom' catalog board={params.board} />
      {children}
      <Links destination='top' catalog board={params.board} />
    </>
  );
}
