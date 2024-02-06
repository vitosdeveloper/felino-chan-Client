import Centralizer from '../../layout/Centralizer';
import BigTitle from '../../text/BigTitle';
import Link from 'next/link';
import classes from './Home.module.css';
import About from './About';

const HomePage = () => {
  return (
    <Centralizer>
      <BigTitle>NEXT.JS</BigTitle>
      <BigTitle>Imageboard</BigTitle>
      <BigTitle>with cute cats</BigTitle>
      <Link href='/hw/1'>
        <BigTitle>/HW/</BigTitle>
      </Link>
      <i className={classes.cuteLittleLetter}>Hello, world!</i>
      <About />
    </Centralizer>
  );
};

export default HomePage;
