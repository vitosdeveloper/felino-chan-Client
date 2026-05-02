'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './Header.module.css';
import { Themes } from '@/app/layout';
import { ChangeEvent, useEffect, useState } from 'react';
import { getOneStorage, setOneStorage } from '@/utils/handleLocalStorage';
import { visibleBoards } from '@/utils/boardsTitle';
import { IBoards } from '@/utils/boards';

const Header = ({ board }: { board?: IBoards }) => {
  const [theme, setTheme] = useState<Themes>('dark');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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
    textColor: string,
    accentColor: string,
    glassBg: string,
    glassBorder: string,
    cardShadow: string
  ) => {
    if (document && document.documentElement) {
      const root = document.documentElement;
      root.style.setProperty('--bodyBgTexture', bodyBgTexture);
      root.style.setProperty('--replyBgTexture', replyBgTexture);
      root.style.setProperty('--linkHoverColor', linkHover);
      root.style.setProperty('--linkColor', link);
      root.style.setProperty('--assuntoColor', assunto);
      root.style.setProperty('--replyBgColor', replyBg);
      root.style.setProperty('--hrColor', hr);
      root.style.setProperty('--headerBgColor', header);
      root.style.setProperty('--bodyBgColor', bodyBg);
      root.style.setProperty('--inputBgColor', inputBg);
      root.style.setProperty('--textColor', textColor);
      root.style.setProperty('--accentColor', accentColor);
      root.style.setProperty('--glassBg', glassBg);
      root.style.setProperty('--glassBorder', glassBorder);
      root.style.setProperty('--cardShadow', cardShadow);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const previousTheme = getOneStorage('felinoChanTheme');
    if (
      typeof previousTheme === 'string' &&
      ['dark', 'default', 'brazil', 'cyberpunk', 'vaporwave', 'caramelo', 'agostinho', 'vasco', 'usa', 'tigrinho', 'urss'].includes(previousTheme)
    ) {
      setTheme(previousTheme as Themes);
    }
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setOneStorage('felinoChanTheme', theme);
    switch (theme) {
      case 'default':
        updateCSSVariables(
          'none',
          'none',
          '#4c1d95', // linkHover
          '#6d28d9', // link
          '#8b5cf6', // assunto
          'rgba(255, 255, 255, 0.8)', // replyBg
          'rgba(0, 0, 0, 0.1)', // hr
          'rgba(248, 250, 252, 0.8)', // header
          '#f8fafc', // bodyBg
          'rgba(255, 255, 255, 0.5)', // inputBg
          '#334155', // textColor
          '#8b5cf6', // accentColor
          'rgba(255, 255, 255, 0.65)', // glassBg
          'rgba(139, 92, 246, 0.15)', // glassBorder
          '0 8px 32px 0 rgba(139, 92, 246, 0.08)' // cardShadow
        );
        break;
      case 'dark':
        updateCSSVariables(
          'none',
          'none',
          '#a5b4fc', // linkHover
          '#818cf8', // link
          '#6366f1', // assunto
          'rgba(30, 32, 38, 0.8)', // replyBg
          'rgba(255, 255, 255, 0.1)', // hr
          'rgba(15, 17, 21, 0.8)', // header
          '#0f1115', // bodyBg
          'rgba(30, 32, 38, 0.6)', // inputBg
          '#f3f4f6', // textColor
          '#6366f1', // accentColor
          'rgba(30, 32, 38, 0.5)', // glassBg
          'rgba(255, 255, 255, 0.08)', // glassBorder
          '0 8px 32px 0 rgba(0, 0, 0, 0.37)' // cardShadow
        );
        break;
      case 'brazil':
        updateCSSVariables(
          'none',
          'none',
          '#fef08a', // linkHover
          '#fde047', // link
          '#facc15', // assunto
          'rgba(22, 101, 52, 0.8)', // replyBg
          'rgba(255, 255, 255, 0.2)', // hr
          'rgba(20, 83, 45, 0.8)', // header
          '#14532d', // bodyBg
          'rgba(22, 101, 52, 0.6)', // inputBg
          '#fefce8', // textColor
          '#fde047', // accentColor
          'rgba(22, 101, 52, 0.5)', // glassBg
          'rgba(253, 224, 71, 0.2)', // glassBorder
          '0 8px 32px 0 rgba(0, 0, 0, 0.4)' // cardShadow
        );
        break;
      case 'cyberpunk':
        updateCSSVariables(
          'none', 'none',
          '#00ffff', // linkHover (cyan)
          '#ff00ff', // link (pink)
          '#00ff00', // assunto (green)
          'rgba(20, 20, 20, 0.8)', // replyBg
          'rgba(0, 255, 0, 0.3)', // hr
          'rgba(5, 5, 5, 0.8)', // header
          '#050505', // bodyBg
          'rgba(20, 20, 20, 0.6)', // inputBg
          '#e0e0e0', // textColor
          '#00ff00', // accentColor
          'rgba(20, 20, 20, 0.7)', // glassBg
          'rgba(0, 255, 0, 0.3)', // glassBorder
          '0 8px 32px 0 rgba(0, 255, 0, 0.15)' // cardShadow
        );
        break;
      case 'vaporwave':
        updateCSSVariables(
          'none', 'none',
          '#b967ff', // linkHover (purple)
          '#01cdfe', // link (cyan)
          '#ff71ce', // assunto (pink)
          'rgba(43, 33, 58, 0.8)', // replyBg
          'rgba(1, 205, 254, 0.3)', // hr
          'rgba(30, 20, 40, 0.8)', // header
          '#2b213a', // bodyBg
          'rgba(43, 33, 58, 0.6)', // inputBg
          '#fffb96', // textColor
          '#ff71ce', // accentColor
          'rgba(255, 113, 206, 0.15)', // glassBg
          'rgba(1, 205, 254, 0.3)', // glassBorder
          '0 8px 32px 0 rgba(255, 113, 206, 0.2)' // cardShadow
        );
        break;
      case 'caramelo':
        updateCSSVariables(
          'none', 'none',
          '#f59e0b', // linkHover
          '#b45309', // link
          '#d97706', // assunto
          'rgba(253, 230, 138, 0.8)', // replyBg
          'rgba(217, 119, 6, 0.2)', // hr
          'rgba(254, 243, 199, 0.9)', // header
          '#fef3c7', // bodyBg
          'rgba(253, 230, 138, 0.6)', // inputBg
          '#451a03', // textColor
          '#d97706', // accentColor
          'rgba(253, 230, 138, 0.6)', // glassBg
          'rgba(217, 119, 6, 0.2)', // glassBorder
          '0 8px 32px 0 rgba(217, 119, 6, 0.15)' // cardShadow
        );
        break;
      case 'agostinho':
        updateCSSVariables(
          'none', 'none',
          '#10b981', // linkHover
          '#3b82f6', // link
          '#ef4444', // assunto
          'rgba(249, 168, 212, 0.8)', // replyBg
          'rgba(239, 68, 68, 0.4)', // hr
          'rgba(253, 224, 71, 0.9)', // header
          '#fef08a', // bodyBg
          'rgba(249, 168, 212, 0.6)', // inputBg
          '#1e3a8a', // textColor
          '#ef4444', // accentColor
          'rgba(249, 168, 212, 0.6)', // glassBg
          'rgba(239, 68, 68, 0.4)', // glassBorder
          '0 8px 32px 0 rgba(16, 185, 129, 0.25)' // cardShadow
        );
        break;
      case 'vasco':
        updateCSSVariables(
          'none', 'none',
          '#f87171', // linkHover
          '#ef4444', // link
          '#dc2626', // assunto
          'rgba(255, 255, 255, 0.05)', // replyBg
          'rgba(255, 255, 255, 0.2)', // hr
          'rgba(15, 15, 15, 0.9)', // header
          '#171717', // bodyBg
          'rgba(255, 255, 255, 0.1)', // inputBg
          '#ffffff', // textColor
          '#dc2626', // accentColor
          'rgba(255, 255, 255, 0.08)', // glassBg
          'rgba(255, 255, 255, 0.2)', // glassBorder
          '0 8px 32px 0 rgba(220, 38, 38, 0.2)' // cardShadow
        );
        break;
      case 'usa':
        updateCSSVariables(
          'none', 'none',
          '#3b82f6', // linkHover
          '#1d4ed8', // link
          '#dc2626', // assunto
          'rgba(255, 255, 255, 0.8)', // replyBg
          'rgba(29, 78, 216, 0.3)', // hr
          'rgba(248, 250, 252, 0.9)', // header
          '#f8fafc', // bodyBg
          'rgba(255, 255, 255, 0.6)', // inputBg
          '#0f172a', // textColor
          '#dc2626', // accentColor
          'rgba(255, 255, 255, 0.8)', // glassBg
          'rgba(29, 78, 216, 0.3)', // glassBorder
          '0 8px 32px 0 rgba(29, 78, 216, 0.2)' // cardShadow
        );
        break;
      case 'tigrinho':
        updateCSSVariables(
          'none', 'none',
          '#f59e0b', // linkHover
          '#d97706', // link
          '#fbbf24', // assunto
          'rgba(255, 251, 235, 0.2)', // replyBg
          'rgba(251, 191, 36, 0.4)', // hr
          'rgba(194, 65, 12, 0.9)', // header
          '#ea580c', // bodyBg
          'rgba(255, 251, 235, 0.3)', // inputBg
          '#fffbeb', // textColor
          '#fbbf24', // accentColor
          'rgba(255, 251, 235, 0.15)', // glassBg
          'rgba(251, 191, 36, 0.4)', // glassBorder
          '0 8px 32px 0 rgba(251, 191, 36, 0.3)' // cardShadow
        );
        break;
      case 'urss':
        updateCSSVariables(
          'none', 'none',
          '#fcd34d', // linkHover
          '#f59e0b', // link
          '#fbbf24', // assunto
          'rgba(254, 226, 226, 0.15)', // replyBg
          'rgba(251, 191, 36, 0.4)', // hr
          'rgba(153, 27, 27, 0.9)', // header
          '#b91c1c', // bodyBg
          'rgba(254, 226, 226, 0.2)', // inputBg
          '#fef2f2', // textColor
          '#fbbf24', // accentColor
          'rgba(254, 226, 226, 0.1)', // glassBg
          'rgba(251, 191, 36, 0.4)', // glassBorder
          '0 8px 32px 0 rgba(251, 191, 36, 0.3)' // cardShadow
        );
        break;
      default:
        break;
    }
  }, [theme]);

  const isTheme = (theme: unknown): theme is Themes => {
    if (
      typeof theme === 'string' &&
      ['dark', 'default', 'brazil', 'cyberpunk', 'vaporwave', 'caramelo', 'agostinho', 'vasco', 'usa', 'tigrinho', 'urss'].includes(theme)
    ) {
      return true;
    }
    return false;
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (isTheme(e.target.value)) setTheme(e.target.value);
  };

  return (
    <header className={`${classes.header} ${scrolled ? classes.scrolled : ''}`}>
      <nav className={classes.nav}>
        <span>[</span>
        <Link href='/' className={pathname === '/' ? classes.activeLink : ''}>home</Link>
        {visibleBoards.map((b) => {
          const isActive = pathname?.startsWith(`/${b}/`);
          return (
            <div key={b}>
              <span>/ </span>
              <Link href={`/${b}/1`} className={isActive ? classes.activeLink : ''}>{b}</Link>
            </div>
          );
        })}
        {board && (
          <>
            <span>/</span>
            <Link href={`/${board}/catalog`} className={pathname?.endsWith('/catalog') ? classes.activeLink : ''}>catalog</Link>
          </>
        )}
        <span>]</span>
      </nav>
      <div className={classes.theme}>
        <label htmlFor='theme'>
          <a>theme</a>:
        </label>
        <select
          multiple={false}
          value={theme}
          id='theme'
          onChange={handleSelectChange}
        >
          <option value='default'>Default</option>
          <option value='dark'>Dark</option>
          <option value='brazil'>Brazil</option>
          <option value='cyberpunk'>Cyberpunk</option>
          <option value='vaporwave'>Vaporwave</option>
          <option value='caramelo'>Caramelo</option>
          <option value='agostinho'>Agostinho</option>
          <option value='vasco'>Vasco</option>
          <option value='usa'>USA</option>
          <option value='tigrinho'>Tigrinho</option>
          <option value='urss'>URSS</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
