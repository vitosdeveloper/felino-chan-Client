import Heading from './Heading.jsx';
import PostCreator from './PostCreator.jsx';
import Thread from './Thread.jsx';
import Footer from './Footer.jsx';
import { useGlobalContext } from '../GlobalContext.jsx';
import { useEffect } from 'react';

function Threading(props) {
  const backendData = useGlobalContext().data;

  let countThreads = 0;
  function countThreadsAdd() {
    countThreads++;
  }

  useEffect(() => {
    window.scrollTo({ top: 199, behavior: 'smooth' });
  }, []);

  return (
    <div>
      <Heading boardName='HW - Hello world' />
      {backendData.length === 0 ? (
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

          {backendData.map(
            (item, index) =>
              item.op ? (
                countThreads >= 150 && countThreads < 165 ? (
                  <Thread
                    key={index}
                    id={index}
                    threads={item}
                    replys={backendData}
                    delete={true}
                  />
                ) : countThreads >= props.pageFrom &&
                  countThreads < props.pageTo ? (
                  <div className='everyThread' key={index}>
                    {countThreadsAdd()}
                    <Thread
                      delete={false}
                      id={index}
                      threads={item}
                      replys={backendData}
                    />
                  </div>
                ) : (
                  countThreadsAdd()
                )
              ) : null //se nao for OP
          )}

          <Footer pages={true} />
        </div>
      )}
    </div>
  );
}

export default Threading;
