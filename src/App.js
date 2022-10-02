import Heading from './components/Heading.jsx';
import PostCreator from './components/PostCreator.jsx';
import { Routes, Route } from 'react-router-dom';
import ThreadForReplys from './components/ThreadForReplys.jsx';
import Threading from './components/Threading.jsx';
import Voltar from './components/Voltar.jsx';
import Footer from './components/Footer.jsx';
import Catalog from './components/Catalog.jsx';
import Homepage from './components/Homepage.jsx';
import ReplyDemo from './components/ReplyDemo.jsx';
import { useGlobalContext } from './GlobalContext.jsx';

function App() {
  const fetchedData = useGlobalContext().dataInvertida;
  const pages = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <Homepage
              data={{
                email: 'vito',
                assunto: 'ta',
                postDay: 's',
                randomIdGeneratedByMe: '123123',
                catUrl: 'https://images6.alphacoders.com/337/337780.jpg',
                catWidth: '100px',
                catHeight: '100px',
                postContent: 'ablalbal',
                imgShow: true,
              }}
            />
          }
        />
      </Routes>

      {/* Outras páginas */}
      <Routes>
        <Route path='/Catalog' element={<Catalog />} />
        {pages.map((item, index) => (
          <Route
            key={index}
            path={'/hw/' + item}
            element={
              <div>
                <Threading page={item - 1} />
              </div>
            }
          />
        ))}
      </Routes>
      {/* pag 1/home */}

      <Routes>
        <Route path='hw' element={<Threading page='0' />} />
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
