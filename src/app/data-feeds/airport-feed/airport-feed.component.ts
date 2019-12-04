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
  arrivalSubject: Subscription;
  departureSubject: Subscription;

  constructor(private airportService: AirportService) { }

  //changes the arrival/departure every 10 sec
  changeVariant(){
    this.isArrival = !this.isArrival
  }

  ngOnInit() {
    interval(10000).subscribe(x => this.changeVariant());
    this.arrivalSubject = this.airportService.airportArrivalSubject.subscribe(arrivals => {
      this.arrivals = arrivals;
    });
    this.departureSubject = this.airportService.airportDepartureSubject.subscribe(departures => {
      this.departures = departures;
    });
    this.airportService.getAirport();
  }

  ngOnDestroy() {
    this.arrivalSubject.unsubscribe();
    this.departureSubject.unsubscribe();
  }
}
