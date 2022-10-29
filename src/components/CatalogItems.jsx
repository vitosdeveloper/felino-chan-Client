import React from 'react';
import { Interweave } from 'interweave';
import { Link } from 'react-router-dom';

function CatalogItems(props) {
  return (
    <div className='catalogItemBorder'>
      <div className='um'>
        <div>
          <Link to={'/' + props.imgUrl}>
            <img className='dois' src={props.CatalogimgContent} alt='gatinho' />
          </Link>
        </div>
        <div className='tres'>
          {<Interweave content={props.CatalogContent} />}
        </div>
      </div>
    </div>
  );
}

export default CatalogItems;
