import Github from '../socialsIcons/Github';
import Linkedin from '../socialsIcons/Linkedin';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer id='bottom' className={classes.footer}>
      <small>
        Tudo escrito nesse fórum não passa de ficção. Somente um idiota levaria
        qualquer coisa aqui a sério.
      </small>
      <small>{new Date().getFullYear()} © Vitos Developer</small>
      <div className={classes.socials}>
        <Linkedin />
        <Github />
      </div>
    </footer>
  );
};

export default Footer;
