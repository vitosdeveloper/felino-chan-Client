import { Post } from '@/types/generalTypes';
import Reply from './Reply';
import { isPost } from '@/lib/mongoHelper';

type Props = {
  replys: Post[];
};

const Replys = ({ replys }: Props) => {
  return (
    <>
      {replys?.map((reply) => {
        return <Reply key={reply._id} reply={reply} />;
      })}
    </>
  );
};

export default Replys;
