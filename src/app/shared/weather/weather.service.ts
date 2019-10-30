import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {Weather} from './weather';
import {BehaviorSubject, Subject} from 'rxjs';
import {StorageService} from '../storage.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Uses OpenWeather API.
 * https://openweathermap.org/
 */
export class WeatherService {
  private _APIKey: string = "";

  weatherSubject = new Subject<Weather>();
  errorSubject = new BehaviorSubject<string>(null);

  private _currentCity: string = "";
  private _isMetric = true;

  constructor (private http: HttpClient, private storageService: StorageService) {
    this.APIKey = this.storageService.getWeatherAPIKey();
    const weatherSettings: {city: string, isMetric: boolean} = this.storageService.getWeather();
    this.currentCity = weatherSettings.city;
    this.isMetric = weatherSettings.isMetric;
  }

  set APIKey(value: string) {
    this._APIKey = value;
    this.storageService.saveWeatherAPIKey(value);
  }

  get APIKey(): string {
    return this._APIKey;
  }

  get currentCity(): string {
    return this._currentCity;
  }

  set currentCity(value: string) {
    this._currentCity = value;
  }

  get isMetric(): boolean {
    return this._isMetric;
  }

  set isMetric(value: boolean) {
    this._isMetric = value;
  }

  /**
   * Does the http request to API and sends results to weatherSubject and if there was an error errorSubject.
   * @param city - name of the city.
   * @param isMetric - if you want the weather data to be return in C or F
   */
  getWeather (city: string, isMetric: boolean) {
    this.currentCity = city;
    this.isMetric = isMetric;

    let params = new HttpParams().set("q", this.currentCity);
    params = params.set("APPID", this.APIKey);
    params = params.set("units", this.isMetric ? "metric" : "imperial");

    this.http.get<Weather>(
      "https://api.openweathermap.org/data/2.5/weather",
      {params: params}
      ).pipe(
      take(1)
    ).subscribe(weather => {
      this.errorSubject.next(null);
      this.weatherSubject.next(weather);
    }, error => {
      this.errorSubject.next(error.error.message);
    });
    this.storageService.saveWeather(this.currentCity, this.isMetric);
  }
}
