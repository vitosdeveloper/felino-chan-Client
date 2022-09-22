import React from 'react';
import Heading from './components/Heading.jsx';
import PostCreator from './components/PostCreator.jsx';
import { Routes, Route } from 'react-router-dom';
import ThreadForReplys from './components/ThreadForReplys.jsx';
import Threading from './components/Threading.jsx';
import Voltar from './components/Voltar.jsx';
import Footer from './components/Footer.jsx';
import Catalog from './components/Catalog.jsx';
import Homepage from './components/Homepage.jsx';
import { useGlobalContext } from './GlobalContext.jsx';

function App() {
  const fetchedData = useGlobalContext().dataInvertida;

  const pages = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let threadsRange = [-15, 0];

  function nextPage() {
    threadsRange[0] += 15;
    threadsRange[1] += 15;
    console.log(threadsRange);
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
      </Routes>

      {/* Outras páginas */}
      <Routes>
        <Route path={'/Catalog'} element={<Catalog />} />
        {pages.map((item, index) => (
          <Route
            key={index}
            path={'/hw/' + item}
            element={
              <div>
                <Threading
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
        {fetchedData.map((item, index) =>
          item.op ? (
            <Route
              key={index}
              path={'/res/' + item.randomIdGeneratedByMe}
              element={
                <div>
                  <Heading boardName='HW - Hello world' />
                  <PostCreator
                    replyTo={item.randomIdGeneratedByMe}
                    isOp={false}
                    sendButton='Responder'
                    board='hw'
                  />
                  <ThreadForReplys
                    id={index}
                    threads={item}
                    replys={fetchedData}
                  />
                  <Voltar url='hw' />
                  <Footer />
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
