import CatalogContainer from '@/app/components/post/thread/CatalogContainer';
import ThreadCell from '@/app/components/post/thread/ThreadCell';
import { getAllThreadsFromSomeBoard } from '@/lib/mongoHelper';
import { Post } from '@/types/generalTypes';
import { IBoards } from '@/utils/boards';

const Catalog = async ({ params }: { params: { board: IBoards } }) => {
  const threads = await getAllThreadsFromSomeBoard(params.board);

  return (
    <CatalogContainer>
      {(threads as Post[]).map((thread) => (
        <ThreadCell key={thread._id} thread={thread} board={params.board} />
      ))}
    </CatalogContainer>
  );
};

export default Catalog;
