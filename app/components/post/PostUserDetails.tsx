import classes from './PostUserDetails.module.css';
import Link from 'next/link';
import PostDeleteCheckBox from './PostDeleteCheckBox';
import { memo } from 'react';
import { IBoards } from '@/utils/boards';
import { useRouter } from 'next/navigation';

type Props = {
  assunto: string;
  email: string;
  id: string;
  postDay: string;
  postNumber: string;
  from?: 'outside' | 'inside';
  op: boolean;
  board: IBoards;
};

const PostUserDetails = ({
  assunto,
  email,
  postDay,
  postNumber,
  from,
  op,
  id,
  board,
}: Props) => {
  const route = useRouter();
  const linkText = from === 'outside' ? 'Responder' : 'Voltar';
  const linkHref =
    from === 'outside' ? '/' + board + '/res/' + postNumber : `/${board}/1`;

  const handleQuoteClick = () => {
    window.dispatchEvent(
      new CustomEvent('felino-quote', { detail: postNumber })
    );
  };

  return (
    <div className={classes.details}>
      <PostDeleteCheckBox id={id} postNumber={postNumber} />
      {assunto && <span className={classes.assunto}>{assunto}</span>}
      <Link
        href={email ? 'mailto:' + email : '/' + board + '/res/' + postNumber}
        className={classes.anon}
      >
        Anônimo
      </Link>
      <span>{postDay}</span>
      <span className={classes.anon}>No.</span>
      <span
        className={`${classes.date} ${classes.quoteNumber}`}
        onClick={handleQuoteClick}
        title="Citar este post"
      >
        {postNumber}
      </span>
      {op && (
        <span>
          [
          <Link href={linkHref + '#bottom'} scroll={true}>
            {linkText}
          </Link>
          ]
        </span>
      )}
    </div>
  );
};

export default memo(PostUserDetails);

