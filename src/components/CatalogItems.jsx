import React from 'react';
import { Interweave } from 'interweave';

function CatalogItems(props) {
  return (
    <div className='catalogItemBorder'>
      <div className='um'>
        <div>
          <a href={props.imgUrl}>
            <img className='dois' src={props.CatalogimgContent} alt='gatinho' />
          </a>
        </div>
        <div className='tres'>
          {<Interweave content={props.CatalogContent} />}
        </div>
      </div>
    </div>
  );
}

export default CatalogItems;
