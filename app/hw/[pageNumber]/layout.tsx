import Hr from '@/app/components/layout/Hr';
import Links from '@/app/components/pages/board/Links';
import Form from '@/app/components/pages/board/form/Form';

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
      <Hr />
      <Links destination='top' />
    </>
  );
}
