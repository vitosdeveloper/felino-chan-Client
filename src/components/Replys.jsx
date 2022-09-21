import React, { useState } from 'react';
import useLocalStorage from 'use-local-storage';
import Axios from 'axios';
import { Interweave } from 'interweave';
import { useGlobalContext } from '../GlobalContext.jsx';

function Replys(props) {
  const { serverUrl, fetchData } = useGlobalContext();

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

  async function deleteThread() {
    const deleteButton = document.querySelector('.deletar');
    const loadingGif = document.querySelector(
      '.removeLoadingGif' + props.replyData.randomIdGeneratedByMe
    );
    deleteButton.style.display = 'none';
    loadingGif.style.display = 'initial';

    const domResponses = (response) => {
      if (response === 200) {
        deleteButton.style.display = 'initial';
        loadingGif.style.display = 'none';
        fetchData();
      } else if (response === 'err') {
        deleteButton.style.display = 'initial';
        loadingGif.style.display = 'none';
        deleteButton.style.color = 'red';
        deleteButton.style.border = '1px solid red';
        deleteButton.innerText = 'Houve algum erro!';
        setTimeout(() => {
          deleteButton.style.color = 'initial';
          deleteButton.style.border = '1px solid black';
          deleteButton.innerText = 'Deletar';
        }, 1500);
        fetchData();
      }
    };

    try {
      await Axios.post(serverUrl + '/deleteReplys', {
        teste: [{ replyData }, passDaqui],
      });
      domResponses(200);
    } catch (err) {
      console.log(err);
      domResponses('err');
    }
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
          <Interweave content={props.replyData.postContent} />
        ) : (
          <Interweave content={props.replyData.postContent} />
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
          <img
            style={{ display: 'none' }}
            className={
              'removeLoadingGif' + props.replyData.randomIdGeneratedByMe
            }
            src='/loading.gif'
            alt='loading'
          />
          <button className='deletar' onClick={deleteThread}>
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Replys;
