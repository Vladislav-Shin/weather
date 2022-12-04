import { useHttp } from "../hooks/http.hook";
import { calcSeconds, chunk, timeConverter } from "../utils";

const useService = () => {
  const { request } = useHttp();

  const _lang = "&lang=ru";
  const _apiBase = "https://api.openweathermap.org/data/2.5/forecast?q=";
  const _key = "b4a4dbd36723c9d6d023e0636c20bc7c";
  const _units = "&units=metric";

  const getWeatherFiveDays = async (city: string = "Ташкент") => {
    const res = await request(`${_apiBase}${city}${_lang}&appid=${_key}${_units}`);
    const currentTime = new Date().toLocaleTimeString();

    return {
      city: _transformCity(res.city),
      list: res.list
        .map((item: Array<any>, i: number) =>
          calcSeconds(currentTime, 0) > calcSeconds(res.list[i].dt_txt.split(" ")[1], 0) &&
          calcSeconds(currentTime, 0) < calcSeconds(res.list[i].dt_txt.split(" ")[1], 10800)
            ? item
            : null
        )
        .filter((item: Array<any>) => item !== null)
        .map(_transformWeather),
      temp: chunk(res),
      data: res.list,
    };
  };

  const _transformCity = (item: any) => {
    return {
      cityName: item.name,
      sunrise: timeConverter(item.sunrise),
      sunset: timeConverter(item.sunset),
    };
  };

  const _transformWeather = (item: any) => {
    const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const options = {
      month: "long",
      day: "numeric",
    } as any;

    return {
      weekday: days[new Date(item.dt_txt.split(" ")[0]).getDay()],
      day: new Date(item.dt_txt.split(" ")[0]).toLocaleString("ru", options),
      id: item.dt_txt.slice(8, 10),
      temp: Math.round(item.main.temp) > 0 ? `+${Math.round(item.main.temp)}` : `${Math.round(item.main.temp)}`,
      humidity: `${item.main.humidity} %`,
      rainfall: `${item.pop} %`,
      wind: `${Math.round(item.wind.speed)} м/с`,
      icon: item.weather[0].icon,
      dt_txt: item.dt_txt.split(" ")[1],
      desc: item.weather[0].description[0].toUpperCase() + item.weather[0].description.slice(1),
      cloudy: item.clouds.all,
      deg: item.wind.deg,
      gust: `${Math.round(item.wind.gust)} м/c`,
      index: item.dt_txt,
    };
  };

  return {
    getWeatherFiveDays,
    _transformWeather,
  };
};

export default useService;
