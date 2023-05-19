import Link from 'next/link';
import classes from './Header.module.css';
import { Themes } from '@/app/layout';
import { ChangeEvent, Dispatch } from 'react';

type Props = { theme: Themes; setTheme: Dispatch<Themes> };

const Header = ({ theme, setTheme }: Props) => {
  const isTheme = (theme: unknown): theme is Themes => {
    if (
      (theme && typeof theme === 'string' && theme === 'dark') ||
      theme === 'default' ||
      theme === 'brazil'
    ) {
      return true;
    }
    return false;
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (isTheme(e.target.value)) setTheme(e.target.value);
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <span>[</span>
        <Link href='/'>home</Link>
        <span>/</span>
        <Link href='/hw/1'>hw</Link>
        <span>/</span>
        <Link href='/hw/catalog'>catalog</Link>
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
        </select>
      </div>
    </header>
  );
};

export default Header;
