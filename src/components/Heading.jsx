import React from 'react';
import BoardList from './BoardList.jsx';

function Heading(props) {
  return (
    <div id='top'>
      <BoardList />
      <div className='boardImg'>
        <img className='boardImgSize' src='/dog.jpg' alt='' />
      </div>
      <h1 className='boardName'>{props.boardName}</h1>
      <hr className='hrHeading' />
    </div>
  );
}

export default Heading;
