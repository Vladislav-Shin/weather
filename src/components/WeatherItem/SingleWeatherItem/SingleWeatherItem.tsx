import classNames from "classnames";
import React, { FC, memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { indexDay } from "../../../utils";
import { IWeather } from "./../../../interfaces/index";

import styles from "./SingleWeatherItem.module.scss";

interface IWeatherProps {
  data: Array<IWeather>;
  id: string | any;
}

const SingleWeatherItem: FC<IWeatherProps> = memo(({ data, id }) => {
  
  return (
    <>
      {data
        .filter((item) => item.day.slice(0, 2).trim() === indexDay(id))
        .map((item) => {
          const { weekday, day, desc, humidity, rainfall, wind, gust, deg, temp, icon, dt_txt, cloudy } = item;
          const link = `https://openweathermap.org/img/wn/${icon}@2x.png`;

          return (
            <div
              className={classNames(styles.row)}
              key={uuidv4()}>
              <div className="flex items-center">
                <div className="weather-top__icon">
                  <img
                    src={link}
                    alt={link}
                  />
                </div>
                <div className="flex flex-col items-center	">
                  <div className="text-3xl font-bold mr-5">
                    {temp}
                    <sup className="text-xl font-normal">°C</sup>
                  </div>
                </div>
                <div className="weather-top__info">
                  <div className="">Вероятность осадков: {rainfall}</div>
                  <div className="">Влажность: {humidity}</div>
                  <div className="">Скорость ветра: {wind}</div>
                  <div className="">Порыв ветра: {gust}</div>
                  <div className="flex">
                    <span className="mr-1">Направление ветра:</span>
                    <svg
                      className={classNames(`${styles.svg} icon icon-tabler icon-tabler-arrow-up`)}
                      style={{ transform: `rotate(${deg}deg)` }}
                      xmlns="http://www.w3.org/2000/svg"
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
                      <line
                        x1="12"
                        y1="5"
                        x2="12"
                        y2="19"
                      />
                      <line
                        x1="18"
                        y1="11"
                        x2="12"
                        y2="5"
                      />
                      <line
                        x1="6"
                        y1="11"
                        x2="12"
                        y2="5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-col">
                <div className="font-bold text-2xl	">{day}</div>
                <div>
                  {weekday} {dt_txt}
                </div>
                <div>
                  {desc}, Облачность {cloudy}%
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
});

export default SingleWeatherItem;
