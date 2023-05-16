import PostUserDetails from './PostUserDetails';
import classes from './HiddenPost.module.css';
import Hr from '../layout/Hr';

type Props = {
  assunto: string;
  email: string;
  id: string;
  postDay: string;
  randomIdGeneratedByMe: number;
  op: boolean;
  handleShowPost: () => void;
  from: 'inside' | 'outside';
};

const HiddenPost = ({
  assunto,
  email,
  id,
  postDay,
  randomIdGeneratedByMe,
  op,
  handleShowPost,
  from,
}: Props) => {
  return (
    <div className={classes.hiddenPost}>
      <p className={classes.show}>
        <small onClick={handleShowPost}>[ + ]</small>
      </p>
      <PostUserDetails
        assunto={assunto}
        email={email}
        id={id}
        postDay={postDay}
        postNumber={String(randomIdGeneratedByMe)}
        from={from}
        op={op}
      />
      {op && <Hr />}
    </div>
  );
};

export default HiddenPost;
