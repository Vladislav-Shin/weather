import React, { FC, memo } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ITempRange, IWeather } from "../../interfaces";
import classNames from 'classnames';
import styles from "./Weatheritem.module.scss";

interface WeatherItemProps {
  data: IWeather[];
  tempRange: ITempRange;
}

const WeatherItem: FC<WeatherItemProps> = memo(({ data, tempRange }) => {

  const renderItems = data.map((item, i) => {
    const { weekday, day, icon, id } = item;
    const link = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    return (
      <li key={uuidv4()}>
        <Link
          to={`/weather/${id}`}
          className={classNames(styles.item)}>
          <div className="text-center">
            <div className="font-medium">{weekday}</div>
            <div className="font-medium">{day}</div>
          </div>
          <img
            src={link}
            alt=""
          />
          <div className="tempRange flex justify-around font-medium">
            <div className="">
              {tempRange?.minTemp[i] > 0 ? tempRange?.minTemp[i] : tempRange?.minTemp[i]}
              <sup className="	text-xs">°C</sup>
            </div>
            <div className="">
              {tempRange?.maxTemp[i] > 0 ? "+" + tempRange?.maxTemp[i] : tempRange?.maxTemp[i]}
              <sup className="text-xs">°C</sup>
            </div>
          </div>
        </Link>
      </li>
    );
  });

  return <>{renderItems}</>;
});

export default WeatherItem;
