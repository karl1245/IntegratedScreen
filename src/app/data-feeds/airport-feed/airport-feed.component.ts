import {Component, OnDestroy, OnInit} from '@angular/core';
import {AirportService} from '../../shared/airport/airport.service';
import {Arrival} from '../../shared/airport/arrival';
import {Departure} from '../../shared/airport/departure';
import {Subscription, interval, timer} from 'rxjs';

@Component({
  selector: 'app-airport-feed',
  templateUrl: './airport-feed.component.html',
  styleUrls: ['./airport-feed.component.css']
})
export class AirportFeedComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['time', 'from', 'flights', 'airlines', 'information'];
  displayedColumns2: string[] = ['time', 'to', 'flights', 'airlines', 'information'];
  arrivals: Arrival[] = [];
  departures: Departure[] = [];

  isArrival = true;

  arrivalsSub: Subscription;
  departuresSub: Subscription;
  timerSub: Subscription;

  constructor(private airportService: AirportService) { }

  ngOnInit() {
    this.airportService.getAirport();

    this.timerSub = interval( 10000).subscribe(() => {
      this.isArrival = !this.isArrival;
    });

    this.arrivals = this.airportService.arrivals;
    this.departures = this.airportService.departures;

    this.arrivalsSub = this.airportService.arrivalsSubject.subscribe(arrivals => {
        this.arrivals = arrivals;
    });
    this.departuresSub = this.airportService.departuresSubject.subscribe(departures => {
      this.departures = departures;
    });
  }

  ngOnDestroy() {
    this.arrivalsSub.unsubscribe();
    this.departuresSub.unsubscribe();
    this.timerSub.unsubscribe();
  }
}
