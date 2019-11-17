import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../../shared/weather/weather.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {InfoModalService} from '../../shared/info-modal.service';
import {MatDialog} from '@angular/material';

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

  keySaved = false;
  citySaved = false;

  constructor(private weatherService: WeatherService,
              private infoModalService: InfoModalService,
              public dialog: MatDialog) {
  }

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

    this.onSaveWeather();
  }

  onSaveAPIKey() {
    this.weatherService.APIKey = this.APIKeyForm.value.APIKey;
    this.onSaveWeather();
    this.keySaved = true;
  }

  onSaveWeather() {
    const city = this.weatherReqForm.value.city;
    const isMetric: boolean = this.weatherReqForm.value.isMetric;
    this.weatherService.getWeather(city, isMetric);
  }

  onSaveWeatherWithMessage() {
    this.onSaveWeather();
    this.citySaved = true;
  }

  openInfo() {
    this.infoModalService.openInfoWeather(this.dialog);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
