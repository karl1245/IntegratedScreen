export class Weather {
  base: string;
  clouds:
    {
      all: number
    };
  cod: number;
  coord:
    {
      lon: number;
      lat: number
    };
  dt: number;
  id: number;
  main:
    {
      temp: number;
      pressure:number;
      humidity:number;
      temp_min: number;
      temp_max: number
    };
  name: string;
  sys:
    {
      type: number;
      id: number;
      message: number;
      country: string;
      sunrise: number;
      sunset: number
    };
  timezone: number;
  visibility: number;
  weather:
    [{
      id: number;
      main: string;
      description: string;
      icon: string
    }];
  wind:
    {
      speed: number;
      deg: number;
      gust: number
    }
}
