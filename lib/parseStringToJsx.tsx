import { IBoards } from '@/utils/boards';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';

const useParseHtmlString = (htmlString: string, board: IBoards) => {
  const options = {
    decodeEntities: true,
    transform: (node: any) => {
      if (
        node.type === 'tag' &&
        node.name === 'a' &&
        node.attribs.href.startsWith('/')
      ) {
        const href = `/${board}${node.attribs.href}`;
        return (
          <Link href={href} className='quote' key={Math.random()}>
            {ReactHtmlParser(node.children[0].data)}
          </Link>
        );
      }
    },
  };
  return ReactHtmlParser(htmlString, options);
};
export default useParseHtmlString;
