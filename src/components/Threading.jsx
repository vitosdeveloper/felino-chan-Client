import Heading from './Heading.jsx';
import PostCreator from './PostCreator.jsx';
import Thread from './Thread.jsx';
import Footer from './Footer.jsx';
import { useGlobalContext } from '../GlobalContext.jsx';
import { useEffect, useState } from 'react';

function Threading(props) {
  const backendData = useGlobalContext().data;
  const threadPorPage = 8;
  const limiteDeThreads = threadPorPage * 10;
  const pageNumber = props.page;
  const threadLimit = [
    pageNumber * threadPorPage,
    pageNumber * threadPorPage + threadPorPage,
  ];

  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const filtered = backendData.filter((item) => {
      return item.op === true;
    });
    setThreads(filtered);
    window.scrollTo({ top: 199, behavior: 'smooth' });
  }, [backendData]);

  return (
    <div>
      <Heading boardName='HW - Hello world' />
      {threads.length === 0 ? (
        <h1
          style={{ marginLeft: '30px', color: '#77654e', textAlign: 'center' }}
        >
          ฅ^•ﻌ•^ฅ Loading...
          <br />
          <div className='loadMessage'>
            The 100% free server can take a while to wake-up
          </div>
        </h1>
      ) : (
        <div>
          <PostCreator
            sendButton='Novo tópico'
            replyTo=''
            isOp={true}
            board='hw'
            imgShow={true}
            catOption={true}
          />

          {threads.map((item, index) =>
            index >= threadLimit[0] && index < threadLimit[1] ? (
              <div className='everyThread' key={index}>
                <Thread
                  delete={false}
                  id={index}
                  threads={item}
                  replys={backendData}
                />
              </div>
            ) : index > limiteDeThreads ? (
              <Thread
                delete={true}
                id={index}
                threads={item}
                replys={backendData}
              />
            ) : null
          )}

          <Footer pages={true} />
        </div>
      )}
    </div>
  );
}

export default Threading;
