import './globals.css';
import Header from '@/app/components/layout/Header';
import { Roboto } from 'next/font/google';
import MainLayout from '@/app/components/layout/MainLayout';
import { ReactNode } from 'react';

export const dynamic = 'force-static';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Felino Chan',
  description: 'Imageboard that uses cat pictures.',
};

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='br'>
      <body className={roboto.className}>
        <Header />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

export default RootLayout;
