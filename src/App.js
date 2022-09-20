import React, { useEffect, useState } from 'react';
import Heading from './components/Heading.jsx';
import PostCreator from './components/PostCreator.jsx';
import { Routes, Route } from 'react-router-dom';
import ThreadForReplys from './components/ThreadForReplys.jsx';
import Threading from './components/Threading.jsx';
import Voltar from './components/Voltar.jsx';
import Footer from './components/Footer.jsx';
import Catalog from './components/Catalog.jsx';
import Homepage from './components/Homepage.jsx';

function App() {
  const [backendData, setBackendData] = useState([]);

  const pages = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let threadsRange = [-15, 0];

  function nextPage() {
    threadsRange = [threadsRange[0] + 15, threadsRange[1] + 15];
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
      <Routes>
        <Route path='/' element={<Homepage />} />
      </Routes>

      {/* Outras páginas */}
      <Routes>
        <Route path={'/Catalog'} element={<Catalog />} />
        {pages.map((index, item) => (
          <Route
            key={index}
            path={'/hw/' + item}
            element={
              <div key={index}>
                <Threading
                  key={index}
                  pageFrom={threadsRange[0]}
                  pageTo={threadsRange[1]}
                />
                {nextPage()}
              </div>
            }
          />
        ))}
      </Routes>
      {/* pag 1/home */}
      <Routes>
        <Route path='hw' element={<Threading pageFrom='0' pageTo='15' />} />
        {/* threads por dentro com PostCreator modificado */}
        {backendData.map((item, index) =>
          item.op ? (
            <Route
              key={index}
              path={'/res/' + item.randomIdGeneratedByMe}
              element={
                <div key={index}>
                  <Heading key={index} boardName='HW - Hello world' />
                  <PostCreator
                    key={index}
                    replyTo={item.randomIdGeneratedByMe}
                    isOp={false}
                    sendButton='Responder'
                    board='hw'
                  />
                  <ThreadForReplys
                    key={index}
                    id={index}
                    threads={item}
                    replys={backendData}
                  />
                  <Voltar key={index} url='hw' />
                  <Footer key={index} />
                </div>
              }
            />
          ) : null
        )}
      </Routes>
    </div>
  );
}

export default App;
