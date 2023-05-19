'use client';
import './globals.css';
import Header from '@/app/components/layout/Header';
import { Roboto } from 'next/font/google';
import MainLayout from '@/app/components/layout/MainLayout';
import { ReactNode, useEffect, useState } from 'react';
import { getOneStorage, setOneStorage } from '@/utils/handleLocalStorage';

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

function RootLayout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Themes>('dark');

  const updateCSSVariables = (
    bodyBgTexture: string,
    replyBgTexture: string,
    linkHover: string,
    link: string,
    assunto: string,
    replyBg: string,
    hr: string,
    header: string,
    bodyBg: string,
    inputBg: string,
    textColor: string
  ) => {
    const root = document.documentElement;
    root.style.setProperty('--bodyBgTexture', bodyBgTexture);
    root.style.setProperty('--replyBgTexture', replyBgTexture);
    root.style.setProperty('--linkHoverColor', linkHover);
    root.style.setProperty('--linkHoverColor', linkHover);
    root.style.setProperty('--linkColor', link);
    root.style.setProperty('--assuntoColor', assunto);
    root.style.setProperty('--replyBgColor', replyBg);
    root.style.setProperty('--hrColor', hr);
    root.style.setProperty('--headerBgColor', header);
    root.style.setProperty('--bodyBgColor', bodyBg);
    root.style.setProperty('--inputBgColor', inputBg);
    root.style.setProperty('--textColor', textColor);
  };

  useEffect(() => {
    const previousTheme = getOneStorage('felinoChanTheme');
    if (previousTheme) {
      setTheme(previousTheme as Themes);
    }
  }, []);

  useEffect(() => {
    setOneStorage('felinoChanTheme', theme);
    switch (theme) {
      case 'default':
        updateCSSVariables(
          'url("/cubes.png")',
          'url("/cubes.png")',
          'rgb(59, 50, 38)',
          'rgb(78, 79, 119)',
          '#3b30ce',
          '#8277e9',
          'rgb(143, 143, 214)',
          'rgb(168, 168, 252)',
          '#c9c4ff',
          'rgb(223, 223, 255)',
          '#000000'
        );
        break;
      case 'dark':
        updateCSSVariables(
          'none',
          'none',
          '#9b9ea2',
          '#dbdee1',
          '#9bb5d0',
          '#383a40',
          'rgb(103, 103, 103)',
          '#1e1f22',
          '#2b2d31',
          '#383a40',
          '#dbdee1'
        );
        break;
      case 'brazil':
        updateCSSVariables(
          'url("/jungle_bg.png")',
          'url("/jungle_reply_bg.png")',
          '#087700',
          '#054500',
          '#1c4abd',
          '#fff697',
          '#08740044',
          '#fff697',
          '#d7e7a8',
          '#fffbcd',
          '#333'
        );
        break;
      default:
        break;
    }
  }, [theme]);

  return (
    <html lang='br'>
      <body className={roboto.className}>
        <Header theme={theme} setTheme={setTheme} />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

export default RootLayout;
