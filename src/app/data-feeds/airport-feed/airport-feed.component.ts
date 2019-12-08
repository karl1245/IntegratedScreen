import {Component, OnDestroy, OnInit} from '@angular/core';
import {AirportService} from '../../shared/airport/airport.service';
import {Arrival} from '../../shared/airport/arrival';
import {Departure} from '../../shared/airport/departure';
import {Subscription, interval} from 'rxjs';

@Component({
  selector: 'app-airport-feed',
  templateUrl: './airport-feed.component.html',
  styleUrls: ['./airport-feed.component.css']
})
export class AirportFeedComponent implements OnInit, OnDestroy {
  arrivals: Arrival[] = [];
  departures: Departure[] = [];
  isArrival = true;

  airportSubject: Subscription;

  constructor(private airportService: AirportService) { }

  ngOnInit() {
    this.airportSubject = this.airportService.airportSubject.subscribe(airport => {
      this.isArrival = airport.isArrival;
      if(this.isArrival) {
        this.arrivals = <Arrival[]>airport.flights;
      } else {
        this.departures = <Departure[]>airport.flights;
      }
    });
  }

  ngOnDestroy() {
    this.airportSubject.unsubscribe();
  }
}
