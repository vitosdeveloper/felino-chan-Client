import { useEffect, useState } from 'react';
import BoardList from './BoardList.jsx';
import { useGlobalContext } from '../GlobalContext.jsx';
import ReplyDemo from './ReplyDemo.jsx';

function Heading(props) {
  const { data } = useGlobalContext();
  const [replyObj, setReplyObj] = useState('');
  let count = 0;

  useEffect(() => {
    function addQuoteEffect() {
      const quotes = document.querySelectorAll('.quotin');

      function mouseUpEvent(e) {
        const { innerText } = e.currentTarget;
        const idToFind = innerText.replace(/(^>{2})/gm, '');
        const findQuote = data.find((item) => {
          return idToFind === item.randomIdGeneratedByMe;
        });

        if (!!findQuote) {
          const x = e.pageX;
          const y = e.pageY;
          setReplyObj(<ReplyDemo data={findQuote} />);

          setTimeout(() => {
            const quoteSelecionado = document.querySelector('.replyBoxDemo');
            if (quoteSelecionado) {
              const quoteToLeft =
                50 + x + quoteSelecionado.clientWidth > window.innerWidth;
              if (quoteToLeft) {
                quoteSelecionado.style.transform = 'translate(-55%, -105%)';
              }
              function posicionarQuote() {
                quoteSelecionado.style.top = y + 'px';
                quoteSelecionado.style.left = x + 'px';
              }
              if (quoteSelecionado) {
                posicionarQuote();
                quotes.forEach((quote) => {
                  quote.addEventListener('mouseout', () => {
                    setReplyObj();
                  });
                });
              }
            }
          }, 1);
        }
      }

      if (count === 0) {
        count++;
        quotes.forEach((quote) => {
          quote.removeEventListener('mouseover', mouseUpEvent);
        });
        quotes.forEach((quote) => {
          quote.addEventListener('mouseover', mouseUpEvent);
        });
      }
    }

    setTimeout(() => {
      addQuoteEffect();
    }, 1);
    // eslint-disable-next-line
  }, [data]);

  return (
    <div id='top'>
      <BoardList />
      <div className='boardImg'>
        <img className='boardImgSize' src='/dog.jpg' alt='' />
      </div>
      <h1 className='boardName'>{props.boardName}</h1>
      <hr className='hrHeading' />
      {replyObj}
    </div>
  );
}

export default Heading;
