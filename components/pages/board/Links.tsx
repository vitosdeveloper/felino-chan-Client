import Link from 'next/link';
import classes from './Links.module.css';

type Props = { destination: string };

const Links = ({ destination }: Props) => {
  return (
    <div className={classes.links}>
      <span>[</span>
      <a href={`#${destination}`}>Go to {destination}</a>
      <span>]</span> <span>[</span>
      <Link href='catalog'>Catálogo</Link>
      <span>]</span>
    </div>
  );
};

export default Links;
