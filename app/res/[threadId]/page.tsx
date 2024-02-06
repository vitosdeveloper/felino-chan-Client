import Hr from '@/app/components/layout/Hr';
import Links from '@/app/components/pages/board/Links';
import Form from '@/app/components/pages/board/form/Form';
import Replys from '@/app/components/post/reply/Replys';
import Thread from '@/app/components/post/thread/Thread';
import { getAllThreads, getThreadsByPageAndItsReplys } from '@/lib/mongoHelper';
import { Post } from '@/types/generalTypes';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {};

// export const revalidate = 0;

const page = async ({ params }: { params: { threadId: string } }) => {
  metadata.description = 'Thread page including all replys';
  metadata.title = `Thread #${params.threadId}`;
  const { thread, replys, redirectTo } = await getThreadsByPageAndItsReplys(
    Number(params.threadId)
  );
  if (thread && thread.op) {
    return (
      <>
        <Form op={false} threadNumber={thread.randomIdGeneratedByMe} />
        <Hr />
        <Links destination='bottom' />
        <Hr />
        <Thread key={thread._id} thread={thread} from='inside'>
          <Replys replys={replys} />
        </Thread>
      </>
    );
  }
  if (!thread && redirectTo) {
    return redirect(
      '/res/' + redirectTo.reply + '#' + redirectTo.randomIdGeneratedByMe
    );
  }

  if (!thread) return <>Thread não encontrada.</>;
};

export default page;

export async function generateStaticParams() {
  const threads = await getAllThreads();
  return (threads as Post[]).map((thread) => ({
    threadId: thread._id.toString(),
    ...thread,
  }));
}
