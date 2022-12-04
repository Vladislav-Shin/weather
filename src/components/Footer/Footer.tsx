import classNames from 'classnames';
import github from "../../assets/github.png";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={classNames(styles.footer)}>
      <div className="container">
        <div className="footer__inner flex justify-between items-center ">
          <a className={classNames(styles.link)} href="https://github.com/Vladislav-Shin">
            <span className={classNames(styles.span)}>Vladislav Shin</span>
            <img className={classNames(styles.img)} src={github} alt="github" />
          </a>
          <a className="font-medium" href="https://openweathermap.org/">API</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;