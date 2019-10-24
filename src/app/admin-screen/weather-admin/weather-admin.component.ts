import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../../shared/weather/weather.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-weather-admin',
  templateUrl: './weather-admin.component.html',
  styleUrls: ['./weather-admin.component.css', '../admin-screen.component.css']
})
export class WeatherAdminComponent implements OnInit, OnDestroy {
  APIkey: string;

  APIKeyForm: FormGroup;
  weatherReqForm: FormGroup;

  errorSub: Subscription;
  errorMessage: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.APIkey = this.weatherService.APIKey;
    this.APIKeyForm = new FormGroup({
      'APIKey': new FormControl(this.weatherService.APIKey)
    });

    this.weatherReqForm = new FormGroup({
      'city': new FormControl(this.weatherService.currentCity),
      'isMetric': new FormControl(this.weatherService.isMetric)
    });

    this.errorSub = this.weatherService.errorSubject.subscribe(error => {
      this.errorMessage = error;
    });

    this.onCheckWeather();
  }

  onSaveAPIKey() {
    this.weatherService.APIKey = this.APIKeyForm.value.APIKey;
    this.onCheckWeather();
  }

  onCheckWeather() {
    const city = this.weatherReqForm.value.city;
    const isMetric: boolean = this.weatherReqForm.value.isMetric;

    this.weatherService.getWeather(city, isMetric);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }



}
