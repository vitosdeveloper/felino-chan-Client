'use client';
import Link from 'next/link';
import classes from './Links.module.css';
import { IBoards } from '@/utils/boards';
import { useRouter } from 'next/navigation';

type Props = { destination: string; catalog?: boolean; board: IBoards };

const Links = ({ destination, catalog, board }: Props) => {
  const route = useRouter();
  return (
    <div className={classes.links} id='top'>
      <span>[</span>
      <Link
        onClick={(e) => {
          e.preventDefault();
          document
            .querySelector(`#${destination}`)
            ?.scrollIntoView({ behavior: 'smooth' });
        }}
        href={`#${destination}`}
      >
        Go to {destination}
      </Link>
      <span>]</span> <span>[</span>
      {catalog ? (
        <Link
          onClick={async (e) => {
            e.preventDefault();
            route.push(`/${board}/1`);
            await new Promise((resolve) => {
              setTimeout(() => {
                document
                  .querySelector(`#top`)
                  ?.scrollIntoView({ behavior: 'smooth' });
                resolve('');
              }, 200);
            });
          }}
          href={`/${board}/1`}
        >
          Board
        </Link>
      ) : (
        <Link href={`/${board}/catalog`}>Catálogo</Link>
      )}
      <span>]</span>
    </div>
  );
};

export default Links;
