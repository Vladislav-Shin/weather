export interface IWeather {
  weekday: string;
  day: string;
  temp: string;
  humidity: string;
  rainfall: string;
  wind: string;
  icon: string;
  dt_txt: string;
  desc: string;
  cloudy: number;
  deg: number;
  gust: string;
  id: string;
}

export interface ICity {
  cityName: string;
  sunrise: string;
  sunset: string
}

export interface ITempRange {
  currentDay: Array<number>;
  maxTemp: Array<number>;
  minTemp: Array<number>
}