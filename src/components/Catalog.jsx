import BoardList from './BoardList.jsx';
import React from 'react';
import CatalogItems from './CatalogItems.jsx';
import Footer from './Footer.jsx';
import { useGlobalContext } from '../GlobalContext.jsx';

function Catalog() {
  const fetchedData = useGlobalContext().data;

  return (
    <div>
      <div className='catalog'>
        <BoardList />

        <h1 href='#top'>"Catalog (/hw/)"</h1>

        {fetchedData.length === 0 ? (
          <h1 style={{ marginLeft: '30px', color: '#77654e' }}>
            ฅ^•ﻌ•^ฅ Loading...
          </h1>
        ) : (
          fetchedData.map((item, index) =>
            item.op ? (
              <CatalogItems
                key={index}
                allContent={item}
                CatalogContent={item.postContent}
                CatalogimgContent={item.catUrl}
                imgUrl={'res/' + item.randomIdGeneratedByMe}
              />
            ) : null
          )
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Catalog;
