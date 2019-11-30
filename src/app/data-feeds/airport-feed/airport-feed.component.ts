import {Component, OnDestroy, OnInit} from '@angular/core';
import {AirportService} from '../../shared/airport/airport.service';
import {Arrival} from '../../shared/airport/arrival';
import {Departure} from '../../shared/airport/departure';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-airport-feed',
  templateUrl: './airport-feed.component.html',
  styleUrls: ['./airport-feed.component.css']
})
export class AirportFeedComponent implements OnInit, OnDestroy {
  isArrival: boolean;
  arrivals: Arrival[] = [];
  departures: Departure[] = [];

  arrivalSubject: Subscription;
  departureSubject: Subscription;

  constructor(private airportService: AirportService) { }

  ngOnInit() {
    this.arrivalSubject = this.airportService.airportArrivalSubject.subscribe(arrivals => {
      this.isArrival = true;
      this.arrivals = arrivals;
    });
    this.departureSubject = this.airportService.airportDepartureSubject.subscribe(departures => {
      this.isArrival = false;
      this.departures = departures;
    });
    this.airportService.getAirport();
  }

  ngOnDestroy() {
    this.arrivalSubject.unsubscribe();
    this.departureSubject.unsubscribe();
  }
}
