import Links from '@/app/components/pages/board/Links';

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { pageNumber: string };
}) {
  return (
    <>
      <Links destination='bottom' catalog />
      {children}
      <Links destination='top' catalog />
    </>
  );
}
