import Linkedin from '@/components/socialsIcons/Linkedin';
import classes from './Home.module.css';
import Github from '@/components/socialsIcons/Github';

const About = () => {
  return (
    <div className={classes.about}>
      <div className={classes.pSpacing}>
        <p>
          Hey there! I&apos;m Vitor, Brazilian, made in 1994.
          <br />
          I&apos;ve been studying Web Development for over a year.
        </p>
        <p>
          This project was originally made using ReactJS, Express, NodeJS and
          MongoDB, but now i&apos;m migrating it into a nice and modern
          Framework: NextJS 13.
        </p>
        <p>Wanna contact me or hire me? Check my socials:</p>
        <i>vitosdeveloper@gmail.com</i>
      </div>
      <div className={classes.social}>
        <Linkedin />
        <Github />
      </div>
    </div>
  );
};

export default About;
