import { Post } from '@/types/generalTypes';
import Reply from './Reply';
import { IBoards } from '@/utils/boards';

type Props = {
  replys: Post[];
  board: IBoards;
};

const Replys = ({ replys, board }: Props) => {
  return (
    <>
      {replys?.map((reply) => {
        return <Reply key={reply._id} reply={reply} board={board} />;
      })}
    </>
  );
};

export default Replys;
