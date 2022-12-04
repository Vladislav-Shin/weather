import classNames from "classnames";
import { FC, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { ICity, IWeather } from "../../../interfaces";

import styles from "./WeatherItemTop.module.scss";
interface WeatherItemTopProps {
  weather: Array<IWeather>;
  city: any;
}

const WeatherItemTop: FC<WeatherItemTopProps> = memo(({ weather, city }): JSX.Element => {

  const renderTopItem = (data: Array<IWeather>) => {
    const res = data.map((item) => {
      const { weekday, desc, humidity, rainfall, wind, temp, icon, dt_txt, cloudy } = item;
      const { cityName, sunrise, sunset } = city as any | undefined;
      const link = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      return (
        <div
          className="weather-top grid grid-cols-2 shadow-md rounded-md mb-10 gap-2"
          key={uuidv4()}>
          <div className={classNames(styles.item)}>
            <div className="weather-top__icon">
              <img
                className="w-20"
                src={link}
                alt={link}
              />
            </div>
            <div className="flex flex-col items-center	">
              <div className={classNames(styles.text)}>
                {temp}
                <sup className="text-xl font-normal">°C</sup>
              </div>
            </div>
            <div className={classNames(styles.info)}>
              <div className="">Вероятность осадков: {rainfall}</div>
              <div className="">Влажность: {humidity}</div>
              <div className="">Скорость ветра: {wind}</div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-sun mr-1"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ffbf00"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path
                    stroke="none"
                    d="M0 0h24v24H0z"
                    fill="none"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />
                  <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                </svg>
                <span>{sunrise}</span>
              </div>
            </div>
          </div>

          <div className={classNames(styles.item, styles.mod)}>
            <div className="text-3xl font-bold">{cityName}</div>
            <div className="">
              {weekday} {dt_txt}
            </div>
            <div className="">
              {desc}, Облачность {cloudy}%
            </div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-shadow mr-1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />
                <path d="M13 12h5" />
                <path d="M13 15h4" />
                <path d="M13 18h1" />
                <path d="M13 9h4" />
                <path d="M13 6h1" />
              </svg>
              <span>{sunset}</span>
            </div>
          </div>
        </div>
      );
    });

    return res;
  };

  const itemTop = renderTopItem(weather);

  return <div>{itemTop[0]}</div>;
});

export default WeatherItemTop;
