import React, { useState } from 'react';
import Replys from './Replys.jsx';
import Axios from 'axios';
import useLocalStorage from 'use-local-storage';
import { Interweave } from 'interweave';
import { useGlobalContext } from '../GlobalContext.jsx';
import { Link } from 'react-router-dom';

function Thread(props) {
  const { serverUrl, fetchData } = useGlobalContext();

  const [postPassword] = useLocalStorage('postFormPassword');

  const [threadHidden, setThreadHidden] = useLocalStorage(
    props.threads.randomIdGeneratedByMe,
    false
  );

  const [deleteBox, setDeleteBox] = useState(false);
  function deletePosts() {
    deleteBox ? setDeleteBox(false) : setDeleteBox(true);
  }

  //deleta itens da página secreta /11, os q excedem o número de páginas
  const [idDaqui] = useState({
    randomIdGeneratedByMe: props.threads.randomIdGeneratedByMe,
  });

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
  }

  if (props.delete === true) {
    Axios.post(serverUrl + '/deletePost', {
      idDaqui,
    });
    setTimeout(() => {
      document.location.reload();
    }, 1000);
  }

  let count = 0;
  function countAdd() {
    count++;
  }

  const threadsData = props.threads;

  const [passDaqui, setPassDaqui] = useState(postPassword);
  function senhaAtual(event) {
    setPassDaqui(event.target.value);
  }

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
    } catch (err) {
      console.log(err);
      domResponses('err');
    }
  }

  return (
    <div name='total'>
      <i id={props.threads.randomIdGeneratedByMe}></i>
      <div
        className='hiddenOnes'
        style={!threadHidden ? { display: 'none' } : null}
      >
        <div className='anonNameLine'>
          <a
            className='aTirarSublinhado'
            onClick={() => {
              !threadHidden ? setThreadHidden(true) : setThreadHidden(false);
            }}
            href='#hideThread'
          >
            [+]{' '}
          </a>
          <input type='checkbox' />
          <span className='anonName'>
            {' '}
            {props.threads.assunto}{' '}
            <span className='aTirarSublinhado' href='#'>
              Anônimo{' '}
            </span>
          </span>
          {props.threads.postDay} No.{props.threads.randomIdGeneratedByMe}
        </div>
      </div>
      <div
        className='threadModel'
        style={threadHidden ? { display: 'none' } : null}
      >
        <div className='arquivoDetalhes'>
          <a
            className='aTirarSublinhado'
            onClick={() => {
              !threadHidden ? setThreadHidden(true) : setThreadHidden(false);
            }}
            href='#hideThread'
          >
            [–]{' '}
          </a>
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
              type='checkbox'
              onClick={() => {
                deletePosts();
              }}
            />
            <span className='anonName'>
              {' '}
              {props.threads.assunto}{' '}
              <a href={'#' + props.threads.email} className='aTirarSublinhado'>
                Anônimo{' '}
              </a>
            </span>
            {props.threads.postDay} No.{props.threads.randomIdGeneratedByMe}{' '}
            <Link
              className='linkColor'
              onClick={fetchData}
              to={'/res/' + props.threads.randomIdGeneratedByMe}
            >
              <span className='linkColor'>[Responder]</span>
            </Link>{' '}
            {deleteBox ? (
              <div className='deleteButton4Threads'>
                Senha:{' '}
                <input
                  name='inputForDeleting'
                  onChange={senhaAtual}
                  value={passDaqui}
                  type='password'
                  maxLength='6'
                  style={{ width: '5rem' }}
                />{' '}
                <img
                  style={{ display: 'none' }}
                  className={
                    'removeLoadingGif' + props.threads.randomIdGeneratedByMe * 2
                  }
                  src='/loading.gif'
                  alt='loading'
                />
                <button className='deletarThread' onClick={deleteThread}>
                  Delete
                </button>
              </div>
            ) : null}
          </div>
          <span className='texto'>
            {<Interweave content={props.threads.postContent} />}
          </span>
        </div>

        {
          props.replys
            .map((item, index) =>
              props.threads.randomIdGeneratedByMe === item.reply ? (
                count < 5 ? (
                  <div key={index}>
                    {countAdd()}
                    <Replys replyData={item} />
                  </div>
                ) : null
              ) : null
            )
            .reverse() //inverte a ordem do render do map, assim posso dar map na data de ordem normal e conseguir o resultado sonhado
        }

        <hr className='hrWithoutBottomMargin' />
      </div>
    </div>
  );
}

export default Thread;
