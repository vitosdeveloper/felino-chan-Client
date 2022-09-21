import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import useLocalStorage from 'use-local-storage';
import { useGlobalContext } from '../GlobalContext.jsx';
import { Navigate } from 'react-router-dom';

function PostCreator(props) {
  const postCount = useGlobalContext().data.length;
  const { serverUrl, fetchData } = useGlobalContext();

  const dayName = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  const diaDaSemana = dayName[new Date().getDay()];
  const dataNumero = new Date().toISOString().slice(0, 10);
  const horaCompleta =
    new Date().getHours() +
    `:` +
    new Date().getMinutes() +
    `:` +
    new Date().getSeconds();
  const [finalHours, setFinalHour] = useState(
    `${dataNumero} ${diaDaSemana} ${horaCompleta}`
  );
  const [passMessage, setPassMessage] = useState('');

  const [newCat, setNewCat] = useState([{}]);

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search')
      .then((response) => response.json())
      .then((data) => {
        setNewCat(data);
      });
  }, []);

  const [password, setPostPassword] = useLocalStorage('postFormPassword', '');
  const [isPasswordSetOrWhat, setIsPasswordSetOrWhat] = useLocalStorage(
    'isPassSetOrWhat',
    false
  );

  if (password.length === 0 && isPasswordSetOrWhat === false) {
    setPostPassword(Math.floor(Math.random() * 1000000));
    setIsPasswordSetOrWhat(true);
  }

  const initialNewPostObject = {
    op: '',
    board: 'hw',
    email: '',
    assunto: '',
    postContent: '',
    inserir: '',
    password: password,
    reply: '',
    randomIdGeneratedByMe: 0,
    catUrl: '',
    catWidth: '',
    catHeight: '',
    postDay: finalHours,
  };

  const [newPost, setNewPost] = useState(initialNewPostObject);

  function editLocalPassword(event) {
    setPostPassword(event.target.value);
  }

  function editPost(event) {
    const { name, value } = event.target;

    setNewPost((lastValues) => {
      return {
        ...lastValues,
        [name]: value,
        reply: props.replyTo,
        op: props.isOp,
        board: props.board,
        catUrl: newCat[0].url,
        catWidth: newCat[0].width,
        catHeight: newCat[0].height,
      };
    });
  }

  //  redirect após envio de mensagem
  const [redirectDom, setRedirectDom] = useState('');

  //  post request
  async function postToDatabase() {
    //  efeitos iniciais
    const sendButton = document.querySelector('[data-send]');
    const loadingGif = document.querySelector('.loadingGif');
    sendButton.style.display = 'none';
    loadingGif.style.display = 'initial';
    //  efeitos dom pro botao
    const domResponses = (response) => {
      if (response === 200) {
        sendButton.style.display = 'initial';
        loadingGif.style.display = 'none';
        setNewPost(initialNewPostObject);
        setRedirectDom(<Navigate to='/hw' />);
      } else if (response === 'err') {
        sendButton.style.display = 'initial';
        loadingGif.style.display = 'none';
        sendButton.style.color = 'red';
        sendButton.style.border = '1px solid red';
        sendButton.innerText = 'Houve algum erro!';
        setTimeout(() => {
          sendButton.style.color = 'initial';
          sendButton.style.border = '1px solid black';
          sendButton.innerText = props.sendButton;
        }, 1500);
      }
    };

    if (newPost.email !== 'sage') {
      try {
        await Axios.post(serverUrl + '/newpost', {
          newPost,
        });
        domResponses(200);
      } catch (err) {
        console.log(err);
        domResponses('err');
      }
    } else {
      try {
        await Axios.post(serverUrl + '/replySage', {
          newPost,
        });
        domResponses(200);
      } catch (err) {
        console.log(err);
        domResponses('err');
      }
    }
  }

  return (
    <div>
      <div className='divPost'>
        <form id='formita' className='postCreate'>
          <table>
            <tbody>
              <tr>
                <th>E-mail</th>
                <td>
                  <input
                    onChange={editPost}
                    name='email'
                    value={newPost.email}
                    size='25'
                  />
                </td>
              </tr>
              <tr>
                <th>Assunto</th>
                <td>
                  <input
                    onChange={editPost}
                    name='assunto'
                    form='formita'
                    size='25'
                    value={newPost.assunto}
                  />
                  <span> </span>
                  {newPost.postContent.length <= 0 ? (
                    <button
                      type='button'
                      style={{ opacity: '0.6', cursor: 'not-allowed' }}
                    >
                      {props.sendButton}
                    </button>
                  ) : (
                    <button
                      data-send
                      type='button'
                      onMouseOver={() => {
                        setFinalHour(
                          `${dataNumero} ${diaDaSemana} ${horaCompleta}`
                        );
                      }}
                      onClick={() => {
                        postToDatabase();
                        fetchData();
                      }}
                    >
                      {props.sendButton}
                    </button>
                  )}
                  <img
                    style={{ display: 'none' }}
                    className='loadingGif'
                    src='/loading.gif'
                    alt='loading'
                  />
                  {redirectDom}
                </td>
              </tr>
              <tr>
                <th>Comentar</th>
                {postCount === undefined ? (
                  'Loading...'
                ) : (
                  <td>
                    {newPost.postContent.length <= 0 ? (
                      <textarea
                        form='formita'
                        minLength='1'
                        required
                        onMouseOver={() => {
                          setFinalHour(
                            `${dataNumero} ${diaDaSemana} ${horaCompleta}`
                          );
                        }}
                        onChange={(event) => {
                          editPost(event);
                        }}
                        name='postContent'
                        rows='5'
                        cols='35'
                        value={newPost.postContent}
                      >
                        {newPost.postContent}
                      </textarea>
                    ) : (
                      <textarea
                        form='formita'
                        minLength='1'
                        onMouseOver={() => {
                          setFinalHour(
                            `${dataNumero} ${diaDaSemana} ${horaCompleta}`
                          );
                        }}
                        onChange={editPost}
                        name='postContent'
                        rows='5'
                        cols='35'
                        value={newPost.postContent}
                      >
                        {newPost.postContent}
                      </textarea>
                    )}
                  </td>
                )}
              </tr>
              <tr>
                <th>Arquivo</th>
                <td>
                  <button
                    type='button'
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                    style={{ opacity: '0.6', cursor: 'not-allowed' }}
                  >
                    Upload desativado
                  </button>

                  {props.catOption ? (
                    <input
                      name='imgShow'
                      type='checkbox'
                      id='catImg'
                      readOnly
                      checked
                    />
                  ) : (
                    <input
                      name='imgShow'
                      onChange={() => {
                        newPost.imgShow
                          ? (newPost.imgShow = false)
                          : (newPost.imgShow = true);
                      }}
                      type='checkbox'
                      id='catImg'
                    />
                  )}

                  <label htmlFor='catImg' className='catCheckFont'>
                    Random Cat Images
                  </label>
                </td>
              </tr>
              <tr>
                <th>inserir</th>
                <td>
                  <input
                    name='inserir'
                    onChange={editPost}
                    value='Desativado. Nunca se sabe.'
                    size='30'
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <th>senha</th>
                <td>
                  <input
                    name='password'
                    type='password'
                    onChange={editLocalPassword}
                    onMouseOver={() => {
                      setPassMessage(
                        'Atualize a página para passar a utilizar a senha e salvá-la em cache!'
                      );
                    }}
                    onMouseOut={() => {
                      setPassMessage('');
                    }}
                    minLength='3'
                    maxLength='6'
                    form='formita'
                    value={password}
                    size='10'
                  />
                  <span className='passMessage'>{passMessage}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <hr className='hrPostCreator' />
      <ul className='ulPost'>
        <li>
          Lembre-se que o intuito desse imageBoard é servir de projeto para meu
          portfólio.
        </li>
        <li>
          Upload de imagens atualmente desativado para economizar data-base e
          evitar problemas legais.
        </li>
        <li>Quotes ainda estão parcialmente em desenvolvimento.</li>
        <li>Seja paciente com potenciais bugs, é meu primeiro projeto.</li>
        <li>Divirta-se.</li>
      </ul>
      <hr className='hrNoventa' />
      <a className='boardLinks aPostCreator' href='#bottom'>
        [Go to bottom]{' '}
      </a>
      <a className='boardLinks' href='/Catalog'>
        [Catálogo]
      </a>
      <hr className='hrNoventa' />
    </div>
  );
}

export default PostCreator;
