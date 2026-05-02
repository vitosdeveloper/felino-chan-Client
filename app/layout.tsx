import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

export const dynamic = 'force-static';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Felino Chan',
  description: 'Imageboard that uses cat pictures.',
};

export type Themes = 'default' | 'dark' | 'brazil' | 'cyberpunk' | 'vaporwave' | 'caramelo' | 'agostinho' | 'vasco' | 'usa' | 'tigrinho' | 'urss';

import BoardNavigator from './components/layout/BoardNavigator';
import AutoScroll from './components/layout/AutoScroll';
import PageUtilities from './components/layout/PageUtilities';
import { ThemeScript } from './components/layout/ThemeScript';

function RootLayout({ children, ...props }: { children: ReactNode }) {
  return (
    <html lang='br'>
      <head>
        <ThemeScript />
      </head>
      <body className={inter.className}>
        <AutoScroll />
        {children}
        <BoardNavigator />
        <PageUtilities />
      </body>
    </html>
  );
}

export default RootLayout;
