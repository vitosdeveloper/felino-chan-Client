import React from 'react';
import { Interweave } from 'interweave';
import { useEffect, useState } from 'react';

function CatalogItems(props) {
  //  transformar textos com >, >>, >>>
  const [textoEstilizado, setTextoEstilizado] = useState();

  useEffect(() => {
    setTextoEstilizado(
      props.CatalogContent.replace(
        /(^>{1}[^>])([\S]+)/gm,
        '<span class="quote">$1$2</span>'
      )
        .replace(/(^>{2}[^>])([\S]+)/gm, '<span class="quotin">$1$2</span>')
        .replace(/(^>{3}[^>])([\S]+)/gm, '<span class="pinkText">$1$2</span>')
    );
    console.log('lol');
  }, []);

  return (
    <div className='catalogItemBorder'>
      <div className='um'>
        <div>
          <a href={props.imgUrl}>
            <img className='dois' src={props.CatalogimgContent} alt='gatinho' />
          </a>
        </div>
        <div className='tres'>{<Interweave content={textoEstilizado} />}</div>
      </div>
    </div>
  );
}

export default CatalogItems;
