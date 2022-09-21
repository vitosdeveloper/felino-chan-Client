import React, { useState, useEffect } from 'react';
import useLocalStorage from 'use-local-storage';
import Axios from 'axios';
import { Interweave } from 'interweave';
import { useGlobalContext } from '../GlobalContext.jsx';

function Replys(props) {
  const serverUrl = useGlobalContext().serverUrl;

  const [textoEstilizado, setTextoEstilizado] = useState();

  useEffect(() => {
    setTextoEstilizado(
      props.replyData.postContent
        .replace(/(^>{3}[^>])([\S]+)/gm, '<span class="pinkText">$1$2</span>')
        .replace(/(^>{2}[^>])([\S]+)/gm, '<span class="quotin">$1$2</span>')
        .replace(/(^>{1}[^>])([\S]+)/gm, '<span class="quote">$1$2</span>')
    );
  }, [props.replyData.postContent]);

  const [postPassword] = useLocalStorage('postFormPassword');

  const [deleteBox, setDeleteBox] = useState(false);
  function deletePosts() {
    deleteBox ? setDeleteBox(false) : setDeleteBox(true);
  }

  const [imgBig, setImgBig] = useState(false);
  function imgSizeUp() {
    imgBig ? setImgBig(false) : setImgBig(true);
  }

  const [imgHidden, setImgHidden] = useLocalStorage(
    props.replyData.randomIdGeneratedByMe + 'replyHidd',
    false
  );
  function hideImage() {
    imgHidden ? setImgHidden(false) : setImgHidden(true);
  }

  const replyData = props.replyData;

  const [passDaqui, setPassDaqui] = useState(postPassword);
  function senhaAtual(event) {
    setPassDaqui(event.target.value);
  }

  function deleteThread() {
    Axios.post(serverUrl + '/deleteReplys', {
      teste: [{ replyData }, passDaqui],
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  return (
    <div className='replyBox'>
      <i id={props.replyData.randomIdGeneratedByMe}></i>
      <div className='replyNameLine'>
        <input
          onClick={() => {
            deletePosts();
          }}
          type='checkbox'
        />
        <span className='anonName'>
          {' '}
          {props.replyData.assunto}{' '}
          <a
            className='aTirarSublinhado'
            style={
              '#' + props.replyData.email === '#sage'
                ? { color: '#0F167A' }
                : null
            }
            href={'#' + props.replyData.email}
          >
            {'#' + props.replyData.email === '#sage' ? 'Sage!' : 'Anônimo'}
          </a>
        </span>
        {props.replyData.postDay} No.{props.replyData.randomIdGeneratedByMe}
      </div>

      <div className='arquivoDetalhes'>
        <br />

        {
          /*  */ props.replyData.imgShow === true ? (
            <small>
              <span className='arquivO'>Arquivo</span> (
              <a
                className='aTirarSublinhado'
                onClick={hideImage}
                href='#esonderImg'
              >
                {imgHidden ? 'mostrar imagem' : 'esconder imagem'}
              </a>
              ):
              <a className='aTirarSublinhado' href={props.replyData.catUrl}>
                {' '}
                gatinho :3
              </a>
              (???? KB, {props.replyData.catWidth}x{props.replyData.catHeight})
            </small>
          ) : null
        }
      </div>

      <div className='detailsDiv'>
        <div className='divFloat'>
          <i
            className='paddingPadrao aTirarSublinhado '
            onClick={imgSizeUp}
            style={imgHidden ? { display: 'none' } : null}
          >
            {props.replyData.imgShow ? (
              !imgBig ? (
                <img
                  src={props.replyData.catUrl}
                  className='textToRight'
                  alt='gatinho'
                  style={{ maxWidth: '255px', maxHeight: '255px' }}
                />
              ) : (
                <img
                  src={props.replyData.catUrl}
                  className='textToRight'
                  alt='gatinho'
                  style={{ maxWidth: '1000px', maxHeight: '1000px' }}
                />
              )
            ) : null}
          </i>
        </div>

        {!props.replyData.imgShow ? (
          <Interweave content={textoEstilizado} />
        ) : (
          <Interweave content={textoEstilizado} />
        )}
      </div>
      {deleteBox ? (
        <div className='deleteButton'>
          Senha:{' '}
          <input
            type='password'
            maxLength='6'
            style={{ width: '5rem' }}
            value={passDaqui}
            onChange={senhaAtual}
          />{' '}
          <button onClick={deleteThread}>Delete</button>
        </div>
      ) : null}
    </div>
  );
}

export default Replys;
