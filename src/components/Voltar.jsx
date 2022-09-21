import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../GlobalContext.jsx';

function Voltar(props) {
  const { fetchData } = useGlobalContext();

  return (
    <Link
      name='bottom'
      onClick={fetchData}
      className='linkColor'
      to={'/' + props.url}
    >
      <span className='boardLinks voltarBut'>[Voltar]</span>
    </Link>
  );
}

export default Voltar;
