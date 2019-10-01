import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../../shared/weather.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-weather-admin',
  templateUrl: './weather-admin.component.html',
  styleUrls: ['./weather-admin.component.css']
})
export class WeatherAdminComponent implements OnInit {
  APIkey: string;

  APIKeyForm: FormGroup;
  weatherReqForm: FormGroup;

  errorMessage: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.APIkey = this.weatherService.APIKey;
    this.APIKeyForm = new FormGroup({
      'APIKey': new FormControl(this.weatherService.APIKey)
    });
    this.weatherReqForm = new FormGroup({
      'city': new FormControl(null),
      'isMetric': new FormControl(true)
    });
  }

  onSaveAPIKey() {
    this.weatherService.APIKey = this.APIKeyForm.value.APIKey;
  }


  onCheckWeather() {
    const city = this.weatherReqForm.value.city;
    const isMetric: boolean = this.weatherReqForm.value.isMetric;
    this.weatherService.getWeather(city, isMetric).subscribe(weather => {
      this.errorMessage = null;
      this.weatherService.weatherSubject.next({weather: weather, isMetric: isMetric});
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

}
