import React, { useState, useEffect } from 'react';
import Replys from './Replys.jsx';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import Axios from 'axios';
import { Interweave } from 'interweave';
import { useGlobalContext } from '../GlobalContext.jsx';

function ThreadForReplys(props) {
  const postsData = useGlobalContext().dataInvertida;
  const serverUrl = useGlobalContext().serverUrl;
  const [textoEstilizado, setTextoEstilizado] = useState();

  useEffect(() => {
    setTextoEstilizado(
      props.threads.postContent
        .replace(/(^>{1}[^>])([\S]+)/gm, '<span class="quote">$1$2</span>')
        .replace(/(^>{2}[^>])([\S]+)/gm, '<span class="quotin">$1$2</span>')
        .replace(/(^>{3}[^>])([\S]+)/gm, '<span class="pinkText">$1$2</span>')
    );
  }, [props.threads.postContent]);

  const [postPassword] = useLocalStorage('postFormPassword');

  const [deleteBox, setDeleteBox] = useState(false);
  function deletePosts() {
    deleteBox ? setDeleteBox(false) : setDeleteBox(true);
  }

  const [imgHidden, setImgHidden] = useLocalStorage(
    props.threads.randomIdGeneratedByMe + 'hide',
    false
  );
  function hideImage() {
    imgHidden ? setImgHidden(false) : setImgHidden(true);
  }

  const [imgBig, setImgBig] = useState(false);
  function imgSizeUp() {
    imgBig ? setImgBig(false) : setImgBig(true);
    console.log(imgBig);
  }

  const threadsData = props.threads;

  const [passDaqui, setPassDaqui] = useState(postPassword);
  function senhaAtual(event) {
    setPassDaqui(event.target.value);
  }

  function deleteThread() {
    Axios.post(serverUrl + '/deletePostButton', {
      teste: [{ threadsData }, passDaqui],
    });
    setTimeout(() => {
      window.location.replace('/hw');
    }, 1000);
  }

  return (
    <div className='threadModel'>
      <i id={props.threads.randomIdGeneratedByMe}></i>

      <div className='arquivoDetalhes'>
        Arquivo{' '}
        <small>
          (
          <a
            className='aTirarSublinhado'
            onClick={hideImage}
            href='#esconderImg'
          >
            {imgHidden ? 'mostrar imagem' : 'esconder imagem'}
          </a>
          ):
          <a className='aTirarSublinhado' href={props.threads.catUrl}>
            {' '}
            gatinho :3{' '}
          </a>
          (???? KB, {props.threads.catWidth}x{props.threads.catHeight})
        </small>
      </div>

      <div className='detailsDiv'>
        <div className='divFloat'>
          <i
            className='paddingPadrao aTirarSublinhado'
            onClick={imgSizeUp}
            style={imgHidden ? { display: 'none' } : null}
          >
            {!imgBig ? (
              <img
                src={props.threads.catUrl}
                className='textToRight'
                alt='gatinho'
                style={{ maxWidth: '255px', maxHeight: '255px' }}
              />
            ) : (
              <img
                src={props.threads.catUrl}
                className='textToRight'
                alt='gatinho'
                style={{ maxWidth: '1000px', maxHeight: '1000px' }}
              />
            )}
          </i>
        </div>

        <div className='anonNameLine'>
          <input
            onClick={() => {
              deletePosts();
            }}
            type='checkbox'
          />
          <span className='anonName'>
            {' '}
            {props.threads.assunto}{' '}
            <a className='aTirarSublinhado' href={'#' + props.threads.email}>
              Anônimo{' '}
            </a>
          </span>
          {props.threads.postDay} No.{props.threads.randomIdGeneratedByMe}{' '}
          <Link className='linkColor' to='/hw'>
            <span className='linkColor'>[Voltar]</span>
          </Link>
          {deleteBox ? (
            <div className='deleteButton4Threads'>
              Senha:{' '}
              <input
                type='password'
                maxLength='6'
                style={{ width: '5rem' }}
                value={passDaqui}
                onChange={senhaAtual}
              />{' '}
              <button
                onClick={() => {
                  deleteThread();
                }}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
        {<Interweave content={textoEstilizado} />}
      </div>

      {postsData
        .map((item, index) =>
          props.threads.randomIdGeneratedByMe === item.reply ? (
            <div key={index}>
              <Replys replyData={item} />
            </div>
          ) : null
        )
        .reverse()}

      <hr className='hrWithoutBottomMargin' />
    </div>
  );
}

export default ThreadForReplys;
