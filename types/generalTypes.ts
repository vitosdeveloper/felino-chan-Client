export interface Post {
  reply: number | false;
  password?: string;
  catUrl: string | null;
  op: boolean;
  _id: string;
  board: string;
  email: string | 'sage';
  assunto: string;
  postContent: string;
  postDay: string;
  catWidth: number;
  catHeight: number;
  randomIdGeneratedByMe: number;
}
