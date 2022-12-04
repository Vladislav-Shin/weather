import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import classNames from "classnames";
import styles from "./AppHeader.module.scss";

const AppHeader = () => {
  return (
    <header className={classNames(styles.header)}>
      <div className="container">
        <div className={styles.row}>
          <div className={styles.logo}>
            <a
              className={classNames(styles.title)}
              href="/">
              Weather
            </a>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
