import React, { useEffect, useState } from 'react';
import Heading from './Heading.jsx';
import PostCreator from './PostCreator.jsx';
import Thread from './Thread.jsx';
import Footer from './Footer.jsx';

function Threading(props) {
  const [backendData, setBackendData] = useState([]);

  let countThreads = 0;
  function countThreadsAdd() {
    countThreads++;
  }

  useEffect(() => {
    fetch('https://felino-chan-server.onrender.com/api')
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
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
                (countThreads >= 150) & (countThreads < 165) ? (
                  <Thread
                    key={index}
                    id={index}
                    threads={item}
                    replys={backendData}
                    delete={true}
                  />
                ) : countThreads >= props.pageFrom &&
                  countThreads < props.pageTo ? (
                  <div key={index}>
                    {countThreadsAdd()}
                    <Thread
                      key={index}
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
