import Link from 'next/link';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <span>[</span>
        <Link href='/'>home</Link>
        <span>/</span>
        <Link href='/hw/1'>hw</Link>
        <span>/</span>
        <Link href='/catalog'>catalog</Link>
        <span>]</span>
      </nav>
    </header>
  );
};

export default Header;
