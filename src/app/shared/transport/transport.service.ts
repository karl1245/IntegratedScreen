import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, Subscription, timer} from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

/**
 * Uses TransportAPI.
 * https://developer.transportapi.com/
 */
export class TransportService {
    
    transportSubject = new BehaviorSubject<{transport: Transport, isMetric: boolean}>(null);
    errorSubject = new BehaviorSubject<string>(null);
    updateTimer: Subscription;
}