import {interval, Subscription} from 'rxjs';
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
  private timerSubAirport: Subscription;

  constructor (
    private weatherService: WeatherService,
    private newsService: NewsService,
    private airportService: AirportService
  ) {}

  /**
   * Starts the update timer. Updates news and weather every 30 minutes. Airport every 10 minutes.
   */
  startTimer() {
    this.timerSub = interval( 1800000).subscribe(() => {
      this.newsService.getNews();
      this.weatherService.getWeather(this.weatherService.currentCity, this.weatherService.isMetric);
      console.log("Updating news and weather!");
    });
    this.timerSubAirport = interval( 600000).subscribe(() => {
      this.airportService.getAirport();
      console.log("Updating airport times!");
    });
  }

  /**
   * Stops the update timer.
   */
  stopTimer() {
    this.timerSub.unsubscribe();
    this.timerSubAirport.unsubscribe();
  }
}

