import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import AppHeader from "../../components/AppHeader/AppHeader";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/spinner/Spinner";
import SingleWeatherItem from "../../components/WeatherItem/SingleWeatherItem/SingleWeatherItem";
import useService from "../../services/Services";
import { showDataWeather } from "../../utils";
import { IWeather } from "./../../interfaces/index";

import styles from "./SinglePage.module.scss";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { weatherFetched } from "../../components/Weathers/WeathersSlice";

const SinglePage = () => {
  const { id } = useParams();
  // const [weathers, setWeathers] = useState([]);
  const [data, setData] = useState() as any;
  const [showWeather, setShowWeather] = useState([]);
  const { title, weather } = useSelector((state) => state) as any;
  const { getWeatherFiveDays, _transformWeather } = useService();
  const dispatch = useDispatch();
  let navigate = useNavigate();


  useEffect(() => {
    getWeatherFiveDays(title).then((data) => {
      dispatch(weatherFetched(data.list));
      // dispatch(weatherFetched(data.data));
      // setWeathers(data.list);
      setData(data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // const res = weather.filter((item: any) => item.day.slice(0, 1) === id) as any;
    const res = data?.filter((item: any) => item.dt_txt.slice(8, 10) === id) as any;

    if (data) {
      setShowWeather(res);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const goBack = () => navigate(-1);

  const renderShowWeather = (data: Array<IWeather>) => {
    const res = data.map(_transformWeather).map((item) => {
      const { temp, dt_txt } = item;
      return (
        <div
          className={classNames(styles.item)}
          key={uuidv4()}>
          <div className={classNames(styles.item__time)}>{dt_txt.slice(0, 5)}</div>
          <div>{temp} °C</div>
        </div>
      );
    });

    return <div className={classNames(styles.row)}>{res}</div>;
  };

  const items = weather ? (
    <SingleWeatherItem
      data={weather}
      id={id}
    />
  ) : (
    <Spinner />
  );

  const itemsWeather = renderShowWeather(showWeather);
  
  return (
    <>
      <AppHeader />
      <main className="main">
        <div className="container">
          <section className="my-4">
            <Button onClick={goBack}>Назад</Button>
          </section>
          {items}
          <section className={classNames(styles.section)}>
            <h2 className={classNames(styles.title)}>Температура за весь день</h2>
          </section>
          <div>{itemsWeather}</div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SinglePage;
