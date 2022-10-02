import React, { useState } from 'react';
import useLocalStorage from 'use-local-storage';
import Axios from 'axios';
import { Interweave } from 'interweave';
import { useGlobalContext } from '../GlobalContext.jsx';
import '../styles/reply.css';

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
    <div className='reply'>
      <input
        onClick={() => {
          deletePosts();
        }}
        type='checkbox'
      />

      <div className='post'>
        <div className='replyDetails'>
          {props.replyData.assunto ? (
            <span className='anon'>{props.replyData.assunto}</span>
          ) : null}
          <a
            className='linkStyle'
            style={
              '#' + props.replyData.email === '#sage'
                ? { color: '#0F167A' }
                : null
            }
            href={'mailto:' + props.replyData.email}
          >
            {'#' + props.replyData.email === '#sage' ? 'Sage!' : 'Anônimo'}
          </a>
          <p>
            {props.replyData.postDay} No.{props.replyData.randomIdGeneratedByMe}
          </p>
        </div>

        <div className='imageDetails'>
          {props.replyData.imgShow === true ? (
            <small>
              Arquivo (
              <a className='linkStyle' onClick={hideImage} href='#esonderImg'>
                {imgHidden ? 'mostrar imagem' : 'esconder imagem'}
              </a>
              ):
              <a className='linkStyle' href={props.replyData.catUrl}>
                gatinho :3
              </a>
              (???? KB, {props.replyData.catWidth}x{props.replyData.catHeight})
            </small>
          ) : null}
        </div>

        <div className='content'>
          <div
            className='replyImage'
            onClick={imgSizeUp}
            style={imgHidden ? { display: 'none' } : null}
          >
            {props.replyData.imgShow ? (
              <img
                src={props.replyData.catUrl}
                alt='gatinho'
                style={
                  !imgBig
                    ? { maxWidth: '255px', maxHeight: '255px' }
                    : { maxWidth: '1000px', maxHeight: '1000px' }
                }
              />
            ) : null}
          </div>

          {!props.replyData.imgShow ? (
            <Interweave
              className='replyText'
              content={props.replyData.postContent}
            />
          ) : (
            <Interweave
              className='replyText'
              content={props.replyData.postContent}
            />
          )}
        </div>

        {deleteBox ? (
          <div className='deleteDiv'>
            <label className='linkStyle' htmlFor='senha'>
              Senha:
            </label>
            <input
              name='senha'
              className='linkStyle'
              type='password'
              maxLength='6'
              style={{ width: '5rem' }}
              value={passDaqui}
              onChange={senhaAtual}
            />
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
    </div>
  );
}

export default Replys;
