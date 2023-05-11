import Linkedin from '@/components/SocialsIcons/Linkedin';
import classes from './Home.module.css';
import Github from '@/components/SocialsIcons/Github';
const About = () => {
  return (
    <div className={classes.about}>
      <p>
        Hey there! I&apos;m Vitor, Brazilian, made in 1994.
        <br />
        I&apos;ve been studying Web Development for over a year.
        <br />
        <br />
        This project was originally made using ReactJS, Express, NodeJS and
        MongoDB, but now i&apos;m migrating it into a nice and modern Framework:
        NextJS 13.
        <br />
        <br />
        Wanna contact me or hire me? Check my socials:
        <br />
        <i>vitosdeveloper@gmail.com</i>
      </p>
      <div className={classes.social}>
        <Linkedin />
        <Github />
      </div>
    </div>
  );
};

export default About;
