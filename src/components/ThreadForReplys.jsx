import React, { useState } from 'react';
import Replys from './Replys.jsx';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import Axios from 'axios';
import { Interweave } from 'interweave';
import { useGlobalContext } from '../GlobalContext.jsx';
import { Navigate } from 'react-router-dom';

function ThreadForReplys(props) {
  const postsData = useGlobalContext().dataInvertida;
  const { fetchData, serverUrl } = useGlobalContext();

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

  const [redirect, setRedirect] = useState('');

  async function deleteThread() {
    const deleteButton = document.querySelector('.deletarThread');
    const loadingGif = document.querySelector(
      '.removeLoadingGif' + props.threads.randomIdGeneratedByMe * 2
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
      await Axios.post(serverUrl + '/deletePostButton', {
        teste: [{ threadsData }, passDaqui],
      });
      domResponses(200);
      setRedirect(<Navigate to='/hw' />);
    } catch (err) {
      console.log(err);
      domResponses('err');
    }
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
          <Link className='linkColor' onClick={fetchData} to='/hw'>
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
              {redirect}
              <img
                style={{ display: 'none' }}
                className={
                  'removeLoadingGif' + props.threads.randomIdGeneratedByMe * 2
                }
                src='/loading.gif'
                alt='loading'
              />
              <button
                className='deletarThread'
                onClick={() => {
                  deleteThread();
                }}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
        <span className='texto'>
          {<Interweave content={props.threads.postContent} />}
        </span>
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
