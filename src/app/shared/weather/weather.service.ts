import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, map, take} from 'rxjs/operators';
import {Weather} from './weather';
import {BehaviorSubject, Subject, Subscription, throwError, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Uses OpenWeather API.
 * https://openweathermap.org/
 */
export class WeatherService {
  /*
  TODO: maybe add instructions
   */
  private _APIKey: string = "";
  weatherSubject = new BehaviorSubject<{weather: Weather, isMetric: boolean}>(null);
  errorSubject = new BehaviorSubject<string>(null);
  updateTimer: Subscription;

  // TODO: maybe take them from local storage
  currentCity: string = "Tallinn";
  isMetric = true;

  constructor (private http: HttpClient) {
    this.updateTimer = timer(0, 900000).subscribe(() => {
      this.getWeather(this.currentCity, this.isMetric);
    });
  }

  set APIKey(value: string) {
    this._APIKey = value;
  }

  get APIKey(): string {
    return this._APIKey;
  }


  /**
   * Returns the http request for the weather request.
   * @param city - name of the city.
   * @param isMetric - if you want the weather data to be return in C or F
   */
  getWeather (city: string, isMetric: boolean) {
    this.currentCity = city;
    this.isMetric = isMetric;

    let params = new HttpParams().set("q", city);
    params = params.set("APPID", this._APIKey);
    params = params.set("units", isMetric ? "metric" : "imperial");

    return this.http.get<Weather>(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: params
      }
    ).pipe(
      take(1)
    );
  }
}
