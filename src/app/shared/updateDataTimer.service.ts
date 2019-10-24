import {HttpClient} from '@angular/common/http';
import {timer} from 'rxjs';
import {WeatherService} from './weather/weather.service';
import {NewsService} from './news/news.service';

export class UpdateDataTimerService {

  constructor (
    private http: HttpClient,
    private weatherService: WeatherService,
    private newsService: NewsService
  ) {
    // TODO: maybe longer interval
    timer(0, 1800000).subscribe(() => {
      this.newsService.getNews();
      this.weatherService.getWeather(this.weatherService.currentCity, this.weatherService.isMetric);
      console.log("Updating feeds!");
    });
  }
}

