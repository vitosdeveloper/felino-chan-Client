import './globals.css';
import { Roboto } from 'next/font/google';
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

export type Themes = 'default' | 'dark' | 'brazil';

function RootLayout({ children, ...props }: { children: ReactNode }) {
  return (
    <html lang='br'>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}

export default RootLayout;
