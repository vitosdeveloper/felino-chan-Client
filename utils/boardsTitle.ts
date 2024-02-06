import { IBoards } from './boards';

export const boardsTitle: { [key in IBoards]: string } = {
  hw: 'HW - Hello World',
  s: 'Board secreta - Saia imediatamente',
  hl: 'Half Life - Scripts e Strats',
  teste: 'teste',
};
export const boards: IBoards[] = Object.keys(boardsTitle) as IBoards[];

const secretas = ['s'];

export const visibleBoards = Object.keys(boardsTitle).filter(
  (b) => !secretas.includes(b)
);
