import Header from '@/components/layout/Header';
import './globals.css';
import { Roboto } from 'next/font/google';
import MainLayout from '@/components/layout/MainLayout';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Felino Chan',
  description: 'Imageboard that uses cat pictures.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='br'>
      <body className={roboto.className}>
        <Header />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
