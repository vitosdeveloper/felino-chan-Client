import Replys from '@/components/post/reply/Replys';
import Thread from '@/components/post/thread/Thread';
import { getLastFiveReplys, getThreadsByPage, isPost } from '@/lib/mongoHelper';

type Props = { page: number };

const PostsFromThisPage = ({ page }: Props) => {
  return (
    <div>
      {getThreadsByPage(page).then((ThreadResponse) =>
        ThreadResponse.map((thread) => {
          if (isPost(thread)) {
            const replys = getLastFiveReplys(thread.randomIdGeneratedByMe);
            return (
              <Thread key={thread._id} thread={thread} from='outside'>
                <Replys replys={replys} />
              </Thread>
            );
          }
        })
      )}
    </div>
  );
};

export default PostsFromThisPage;
