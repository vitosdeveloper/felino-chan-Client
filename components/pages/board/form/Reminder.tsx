import React from 'react';
import classes from './Reminder.module.css';

const Reminder = () => {
  return (
    <ul className={classes.list}>
      <li>
        <small>
          Lembre-se que o intuito desse Imageboard é servir como projeto para
          meu portfólio.
        </small>
      </li>
      <li>
        <small>Divirta-se.</small>
      </li>
    </ul>
  );
};

export default Reminder;
