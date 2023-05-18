import Replys from '@/app/components/post/reply/Replys';
import Thread from '@/app/components/post/thread/Thread';
import { getThreadsAndItsReplysByPage } from '@/lib/mongoHelper';
import { Post } from '@/types/generalTypes';
import Pagination from './Pagination';

type Props = { page: number };

const PostsFromThisPage = async ({ page }: Props) => {
  const { threads, replys } = (await getThreadsAndItsReplysByPage(page)) || {
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
          <Thread key={thread._id} thread={thread} from='outside'>
            <Replys replys={lastFiveReplys} />
          </Thread>
        );
      })}
      <Pagination currentPage={page} />
    </div>
  );
};

export default PostsFromThisPage as unknown as (props: Props) => JSX.Element;
