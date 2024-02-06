import Replys from '@/app/components/post/reply/Replys';
import Thread from '@/app/components/post/thread/Thread';
import { getThreadsAndItsReplysByPage } from '@/lib/mongoHelper';
import { Post } from '@/types/generalTypes';
import Pagination from './Pagination';
import { IBoards } from '@/utils/boards';

type Props = { page: number; board: IBoards };

const PostsFromThisPage = async ({ page, board }: Props) => {
  const { threads, replys } = (await getThreadsAndItsReplysByPage(
    page,
    board
  )) || {
    threads: [],
  };

  return (
    <div>
      {(threads as Post[]).map((thread) => {
        const replysFromThisThread = (replys as Post[]).filter(
          (reply) => reply.reply === thread.randomIdGeneratedByMe
        );
        const lastFiveReplys = replysFromThisThread
          .filter((r, i) => i <= 4)
          .reverse();
        return (
          <Thread key={thread._id} thread={thread} from='outside' board={board}>
            <Replys replys={lastFiveReplys} board={board} />
          </Thread>
        );
      })}
      <Pagination currentPage={page} board={board} />
    </div>
  );
};

export default PostsFromThisPage as unknown as (props: Props) => JSX.Element;
