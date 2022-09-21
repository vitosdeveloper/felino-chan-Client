import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../GlobalContext.jsx';

function BoardList() {
  const { fetchData } = useGlobalContext();

  return (
    <div className='boardList'>
      <i name='top'></i>[{' '}
      <Link className='boardLinks' onClick={fetchData} to='/'>
        home{' '}
      </Link>{' '}
      /
      <Link className='boardLinks' onClick={fetchData} to='/hw'>
        {' '}
        hw
      </Link>{' '}
      /
      <Link className='boardLinks' onClick={fetchData} to='/catalog'>
        {' '}
        catalog
      </Link>{' '}
      ]
    </div>
  );
}

export default BoardList;
