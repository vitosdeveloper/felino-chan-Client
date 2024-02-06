import CatalogContainer from '@/app/components/post/thread/CatalogContainer';
import ThreadCell from '@/app/components/post/thread/ThreadCell';
import { getAllThreads } from '@/lib/mongoHelper';
import { Post } from '@/types/generalTypes';

const Catalog = async () => {
  const threads = await getAllThreads();
  return (
    <CatalogContainer>
      {(threads as Post[]).map((thread) => (
        <ThreadCell key={thread._id} thread={thread} />
      ))}
    </CatalogContainer>
  );
};

export default Catalog;
