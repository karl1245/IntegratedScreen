import {Subscription, timer} from 'rxjs';
import {WeatherService} from './weather/weather.service';
import {NewsService} from './news/news.service';
import {Injectable} from '@angular/core';
import {AirportService} from './airport/airport.service';

/**
 * Updates data feeds data after 30 minutes.
 */
@Injectable({
  providedIn: 'root'
})
export class UpdateDataTimerService {
  private timerSub: Subscription;

  constructor (
    private weatherService: WeatherService,
    private newsService: NewsService,
    private airportService: AirportService
  ) {}

  /**
   * Starts the update timer.
   */
  startTimer() {
    // TODO: maybe longer interval
    // TODO: give this information to the user that it is updated after 30 min.
    this.timerSub = timer(0, 1800000).subscribe(() => {
      this.newsService.getNews();
      this.weatherService.getWeather(this.weatherService.currentCity, this.weatherService.isMetric);
      this.airportService.getAirport();
      console.log("Updating feeds!");
    });
  }

  /**
   * Stops the update timer.
   */
  stopTimer() {
    this.timerSub.unsubscribe();
  }
}

