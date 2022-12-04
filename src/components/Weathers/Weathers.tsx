import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ICity, ITempRange, IWeather } from "../../interfaces";
import { weatherFetched, cityFetched, tempFetched, errorHandler } from "./WeathersSlice";
import useService from "../../services/Services";
import WeatherItem from "../WeatherItem/WeatherItem";
import WeatherItemTop from "../WeatherItem/WeatherItemTop/WeatherItemTop";

const WeatherItems = () => {
  // const [weather, setWeather] = useState<Array<IWeather>>([]);
  // const [city, setCity] = useState<ICity | any>();
  // const [tempRange, setTempRange] = useState<ITempRange | any>();
  const { getWeatherFiveDays } = useService();
  // const {title} = useSelector(state => state) as any;
  const { weather, title, city, tempRange } = useSelector((state) => state) as any;
  const dispatch = useDispatch();
  
  useEffect(() => {
    getWeatherFiveDays(title)
      .then((data) => {
        dispatch(weatherFetched(data.list));
        dispatch(cityFetched(data.city));
        dispatch(tempFetched(data.temp));
        // setCity(data.city);
        // setTempRange(data.temp);
      })
      .catch(() => dispatch(errorHandler(true)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  useEffect(() => {
    const currentDay = +new Date().toLocaleString("ru", { day: "numeric" });
    const checkCurrentDay = +weather[0]?.day.slice(0, 2);

    if (!localStorage.getItem("currentDay")) {
      if (tempRange?.currentDay !== undefined) {
        localStorage.setItem("currentDay", JSON.stringify(tempRange?.currentDay));
      }
    }

    if (localStorage.getItem("currentDay")) {
      if (JSON.parse(localStorage.getItem("currentDay") as string).length < tempRange?.currentDay.length) {
        localStorage.setItem("currentDay", JSON.stringify(tempRange?.currentDay));
      }
      if (typeof currentDay === "number" && typeof checkCurrentDay === "number" && !isNaN(checkCurrentDay)) {
        if (currentDay !== checkCurrentDay) {
          localStorage.setItem("currentDay", JSON.stringify(tempRange?.currentDay));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempRange?.currentDay]);

  const renderWeatherItems = (data: Array<IWeather>) => {
    let min,
      max,
      minTemp = tempRange?.minTemp[0],
      maxTemp = tempRange?.minTemp[0];

    if (localStorage.getItem("currentDay")) {
      max = Math.max(...JSON.parse(localStorage.getItem("currentDay") as string));
      min = Math.min(...JSON.parse(localStorage.getItem("currentDay") as string));
      if (minTemp !== undefined) {
        minTemp = min;
      }
      if (maxTemp !== undefined) {
        maxTemp = max;
      }
    }

    return (
      <ul className="flex justify-between">
        <WeatherItem
          data={data}
          tempRange={tempRange}
        />
      </ul>
    );
  };
  const items = renderWeatherItems(weather);

  return (
    <div className="container">
      <div className="home__inner py-4">
        <WeatherItemTop
          weather={weather}
          city={city}
        />
        {items}
      </div>
    </div>
  );
};

export default WeatherItems;
