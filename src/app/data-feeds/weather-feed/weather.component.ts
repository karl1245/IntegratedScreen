import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../../shared/weather/weather.service';
import {Weather} from '../../shared/weather/weather';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})


export class WeatherComponent implements OnInit, OnDestroy {
  city: string;
  weather: Weather;
  isMetric: boolean;

  weatherSub: Subscription;

  weatherImageLocation = "";

  public showContent = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherSub = this.weatherService.weatherSubject.subscribe(weather => {
      this.weather = weather;
      this.weatherImageLocation = 'http://openweathermap.org/img/wn/' + this.weather.weather[0].icon + '@2x.png';
      this.isMetric = this.weatherService.isMetric;
      this.city = this.weatherService.currentCity;
    });
    this.weatherService.getWeather(this.weatherService.currentCity, this.weatherService.isMetric);
    setTimeout(() => this.showContent = true, 2000);
  }

  ngOnDestroy() {
    this.weatherSub.unsubscribe();
  }
}
