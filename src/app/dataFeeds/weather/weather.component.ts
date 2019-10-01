import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {WeatherService} from '../../shared/weather.service';
import {Weather} from '../../shared/weather';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription, timer} from 'rxjs';

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



  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherSub = this.weatherService.weatherSubject.subscribe(response => {
      this.weather = response.weather;
      this.weatherImageLocation = "http://openweathermap.org/img/wn/" + this.weather.weather[0].icon + "@2x.png";
      this.isMetric = response.isMetric;
      this.city = response.weather.name
    });
  }

  ngOnDestroy() {
    this.weatherSub.unsubscribe();
  }
}
