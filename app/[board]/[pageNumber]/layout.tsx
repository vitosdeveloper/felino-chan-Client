import Hr from '@/app/components/layout/Hr';
import Links from '@/app/components/pages/board/Links';
import Form from '@/app/components/pages/board/form/Form';
import { IBoards } from '@/utils/boards';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pageNumber: string; board: IBoards };
}) {
  return (
    <>
      <Form op={true} board={params.board} />
      <Hr />
      <Links destination='bottom' board={params.board} />
      <Hr />
      {children}
      <Hr />
      <Links destination='top' board={params.board} />
    </>
  );
}
