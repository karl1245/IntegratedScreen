import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, Subscription, timer} from 'rxjs';
import {StorageService} from '../storage.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

export class TransportService {
  private _APIKey: string = "";
  errorSubject = new BehaviorSubject<string>(null);

  constructor (private http: HttpClient, private storageService: StorageService) {
    this.APIKey = this.storageService.getTransportAPIKey();
  }

  get APIKey(): string {
    return this._APIKey;
  }

  set APIKey(value: string) {
    this._APIKey = value;
    this.storageService.saveTransportAPIKey(value);
  }

}