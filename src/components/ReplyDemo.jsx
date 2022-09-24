import { Interweave } from 'interweave';

function ReplyDemo(props) {
  return (
    <div className='replyBoxDemo replyDemo'>
      <i id={props.data.randomIdGeneratedByMe}></i>
      <div className='replyNameLine'>
        <span className='anonName'>
          {' '}
          {props.data.assunto}{' '}
          <a
            className='aTirarSublinhado'
            style={
              '#' + props.data.email === '#sage' ? { color: '#0F167A' } : null
            }
            href={'#' + props.data.email}
          >
            {'#' + props.data.email === '#sage' ? 'Sage!' : 'Anônimo'}
          </a>
        </span>
        {props.data.postDay} No.{props.data.randomIdGeneratedByMe}
      </div>

      <div className='detailsDiv'>
        <div className='divFloat'>
          {props.data.imgShow || props.data.op ? (
            <img
              src={props.data.catUrl}
              className='textToRight'
              alt='gatinho'
              style={{ maxWidth: '255px', maxHeight: '255px' }}
            />
          ) : null}
        </div>
        <span className='texto'>
          {!props.data.imgShow ? (
            <Interweave content={props.data.postContent} />
          ) : (
            <Interweave content={props.data.postContent} />
          )}
        </span>
      </div>
    </div>
  );
}

export default ReplyDemo;
