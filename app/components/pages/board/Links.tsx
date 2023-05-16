import Link from 'next/link';
import classes from './Links.module.css';

type Props = { destination: string; catalog?: boolean };

const Links = ({ destination, catalog }: Props) => {
  return (
    <div className={classes.links} id='top'>
      <span>[</span>
      <a href={`#${destination}`}>Go to {destination}</a>
      <span>]</span> <span>[</span>
      {catalog ? (
        <Link href='/hw/1'>Board</Link>
      ) : (
        <Link href='/hw/catalog'>Catálogo</Link>
      )}
      <span>]</span>
    </div>
  );
};

export default Links;
