import classes from './PostUserDetails.module.css';
import Link from 'next/link';
import PostDeleteCheckBox from './PostDeleteCheckBox';
import { memo } from 'react';

type Props = {
  assunto: string;
  email: string;
  id: string;
  postDay: string;
  postNumber: string;
  from?: 'outside' | 'inside';
  op: boolean;
};

const PostUserDetails = ({
  assunto,
  email,
  postDay,
  postNumber,
  from,
  op,
  id,
}: Props) => {
  const linkText = from === 'outside' ? 'Responder' : 'Voltar';
  const linkHref = from === 'outside' ? '/res/' + postNumber : '/hw/1';

  return (
    <div className={classes.details}>
      <PostDeleteCheckBox id={id} />
      {/* <p className={classes.details}> */}
      {assunto && <span className={classes.assunto}>{assunto}</span>}
      <Link
        href={email ? 'mailto:' + email : '/res/' + postNumber}
        className={classes.anon}
      >
        Anônimo
      </Link>
      <span className={classes.date}>{postDay}</span>
      <span className={classes.anon}>No.</span>
      <span className={classes.date}>{postNumber}</span>
      {/* </p> */}
      {op && (
        <span>
          [<Link href={linkHref}>{linkText}</Link>]
        </span>
      )}
    </div>
  );
};

export default memo(PostUserDetails);
