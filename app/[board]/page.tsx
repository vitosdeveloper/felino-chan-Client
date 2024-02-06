import { IBoards } from '@/utils/boards';
import { redirect } from 'next/navigation';
type Props = { params: { board: IBoards } };

const BoardRedirect = ({ params }: Props) => {
  return redirect(`/${params.board}/1`);
};

export default BoardRedirect;
