import React, { useState } from 'react';
import Replys from './Replys.jsx';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';
import Axios from 'axios';
import $ from 'jquery';
import { Interweave } from 'interweave';
import { useGlobalContext } from '../GlobalContext.jsx';

function ThreadForReplys(props) {
  const postsData = useGlobalContext().dataInvertida;
  const serverUrl = useGlobalContext().serverUrl;

  let wut =
    "<p class='everyPostP'>" +
    props.threads.postContent.replace(/\n/g, "<p class='everyPostP'>");
  function a() {
    $('p').each(function () {
      if ($(this).text().indexOf('>>>') === 0) {
        $(this).addClass('pinkText everyPostP');
      } else if ($(this).text().indexOf('>>') === 0) {
        //$(this).after("\n")
        $(this).addClass('quotin');
        $(this).on('mouseover', (e) => {
          const div = $("<div class='replyDemo'>")
            .css({
              left: e.pageX + 'px',
              top: e.pageY + 'px',
            })
            .append(
              postsData.map((item) => {
                if (item.randomIdGeneratedByMe === $(this).html().slice(8)) {
                  const watReply =
                    "<p class='everyPostP'>" +
                    item.postContent.replace(
                      /\n/g,
                      "</p><p class='everyPostP'>"
                    );
                  function b() {
                    $('p').each(function applyCollors() {
                      if ($(this).text().indexOf('>>>') === 0) {
                        $(this).addClass('pinkText everyPostP');
                      } else if ($(this).text().indexOf('>>') === 0) {
                        $(this).addClass('quotin');
                      } else if ($(this).text().indexOf('>') === 0) {
                        $(this).addClass('quote everyPostP');
                      }
                    });
                  }
                  setTimeout(() => {
                    b();
                  }, 1);
                  return `
                                    <div class="replyBoxDemo">
                                    <p class="replyNameLine"><span class="anonName" style="margin-left: 10px;"> ${
                                      item.assunto !== undefined
                                        ? item.assunto
                                        : ''
                                    } <a class="aTirarSublinhado" style=${
                    '#' + item.email === '#sage' ? { color: '#0F167A' } : null
                  } href=${'#' + item.email}>${
                    '#' + item.email === '#sage' ? 'Sage!' : 'Anônimo'
                  }</a></span>${item.postDay} No.${
                    item.randomIdGeneratedByMe
                  }</p>
                                    <div class="detailsDiv">
                                    <div class="divFloat">
                                    <i class="paddingPadrao aTirarSublinhado ">
                                    ${
                                      item.op === true &&
                                      item.imgShow === undefined
                                        ? `<img src=${item.catUrl} class="textToRight" alt="gatinho" style="margin-top: 8px; max-width: 255px; maxheight: 255px"/>`
                                        : item.imgShow === true
                                        ? `<img src=${item.catUrl} class="textToRight" alt="gatinho" style="margin-top: 8px; max-width: 255px; maxheight: 255px"/>`
                                        : ``
                                    }
                                    </i>
                                    </div>
                                    <span>${watReply}</span>         
                                    </div>        
                                    </div>
                                    `;
                }
                return null;
              })
            )
            .appendTo(document.body);
          $(this).on('mouseout', () => {
            div.remove();
          });
          $(this).on('click', (e) => {
            window.location.replace('#' + $(this).html().slice(8));
          });
        });
      } else if ($(this).text().indexOf('>') === 0) {
        $(this).addClass('quote everyPostP');
      }
    });
  }
  setTimeout(() => {
    a();
  }, 200);

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
        {<Interweave content={wut} />}
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
