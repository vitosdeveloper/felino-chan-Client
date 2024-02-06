import PostUserDetails from './PostUserDetails';
import classes from './HiddenPost.module.css';
import Hr from '../layout/Hr';
import { IBoards } from '@/utils/boards';

type Props = {
  assunto: string;
  email: string;
  id: string;
  postDay: string;
  randomIdGeneratedByMe: number;
  op: boolean;
  handleShowPost: () => void;
  from: 'inside' | 'outside';
  board: IBoards;
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
  board,
}: Props) => {
  return (
    <div className={classes.hiddenPost}>
      <p className={classes.show}>
        <small onClick={handleShowPost}>[ + ]</small>
      </p>
      <PostUserDetails
        board={board}
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
