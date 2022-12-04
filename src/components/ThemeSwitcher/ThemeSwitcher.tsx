import { useState, useEffect, FC } from "react";
import { ReactComponent as MoonIcon } from "../../assets/icon-moon.svg";
import { ReactComponent as SunIcon } from "../../assets/icon-sun.svg";
import classNames from "classnames";

import styles from "./ThemeSwitcher.module.scss";

const ThemeSwitcher: FC = () => {
  const themeLocal = localStorage.getItem("theme") === "dark" ? true : false;
  const [isDark, setDark] = useState<boolean>(themeLocal);
  const themeText = isDark ? "Light" : "Dark";
  const ThemeIcon = isDark ? SunIcon : MoonIcon;

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");

    document.body.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div
      onClick={() => setDark(!isDark)}
      className={classNames(styles.switcher)}>
      <span>{themeText}</span>
      <ThemeIcon className={styles.icon} />
    </div>
  );
};

export default ThemeSwitcher;
