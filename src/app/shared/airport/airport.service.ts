import {StorageService} from '../storage.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, take} from 'rxjs/operators';
import {Arrival} from './arrival';
import {Departure} from './departure';
import {Subject} from 'rxjs';

/**
 * Service that handles Tallinn Airport related tasks.
 */
@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private _isArrival = true;

  airportArrivalSubject = new Subject<Arrival[]>();
  airportDepartureSubject = new Subject<Departure[]>();

  constructor(private storageService: StorageService,
              private http: HttpClient) {
    this.isArrival = this.storageService.getAirport();
    this.getAirport();
  }

  get isArrival(): boolean {
    return this._isArrival;
  }

  set isArrival(value: boolean) {
    this._isArrival = value;
    this.storageService.saveAirport(value);
  }

  getAirport() {
    if (this.isArrival) {
      this.getArrivalsOutOfHTML();
    } else {
      this.getDeparturesOutOfHTML();
    }
  }

  private getArrivalsOutOfHTML() {
    this.http.get('http://localhost:3000/arrivals', {responseType: 'text'}).pipe(
      take(1),
      map(response => {
        let arrivals = [];

        const htmlString = response;
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = htmlString;
        const table = this.getElementByAttribute("data-flights-type", "arrivals", htmlObject);
        const rows = table.querySelectorAll('.t-row:not(.hidden)');

        for(var i = 1; i < rows.length; i++) {
          const row = rows[i];
          if(row.getElementsByClassName("col-1-text").item(0) != null) {
            const time = this.getTime(row);
            const from = this.getToFrom(row);
            const info = this.getInfo(row);
            const flights = this.getFlights(row);
            const airlines = this.getAirlines(row);
            const arrival = new Arrival(time, from, flights, airlines, info);
            arrivals.push(arrival)
          }
        }
        return arrivals;
      })
    ).subscribe(
      arrivals => {
        this.airportArrivalSubject.next(arrivals);
      }
    );
  }

  private getDeparturesOutOfHTML() {
    this.http.get('http://localhost:3000/departures', {responseType: 'text'}).pipe(
      take(1),
      map(response => {
        let departures = [];

        const htmlString = response;
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = htmlString;
        const table = this.getElementByAttribute("data-flights-type", "departures", htmlObject);
        const rows = table.querySelectorAll('.t-row:not(.hidden)');

        for(var i = 1; i < rows.length; i++) {
          const row = rows.item(i);
          if(row.getElementsByClassName("col-1-text").item(0) != null) {
            const time = this.getTime(row);
            const to = this.getToFrom(row);
            const info = this.getInfo(row);
            const flights = this.getFlights(row);
            const airlines = this.getAirlines(row);
            const departure = new Departure(time, to, flights, airlines, info);
            departures.push(departure)
          }
        }
        return departures;
      })
    ).subscribe(
      departures => {
        this.airportDepartureSubject.next(departures);
      }
    );
  }


  private getTime(row) {
    return row.getElementsByClassName("col-1-text").item(0).textContent.trim();
  }

  private getToFrom(row) {
    return row.getElementsByClassName("col-2-text").item(0).textContent.trim();
  }
  private getInfo(row) {
    return row.getElementsByClassName("col-5-text").item(0).textContent.trim();
  }

  private getFlights(row) {
    return this.getArray(row, "col-3-text")
  }

  private getAirlines(row) {
    return this.getArray(row, "col-4-text");
  }

  private getArray(row, className) {
    var array = [];
    const rowClass = row.getElementsByClassName(className).item(0);

    if(rowClass.getElementsByTagName("span").length > 0) {
      const flightsCycle = rowClass.getElementsByTagName("span");
      for(var k = 0; k < flightsCycle.length; k++) {
        const f = flightsCycle.item(k).textContent.trim();
        array.push(f);
      }
    } else {
      array.push(rowClass.textContent.trim());
    }
    return array;
  }

  private getElementByAttribute(attr, value, root) {
    // https://stackoverflow.com/questions/6267816/getting-element-by-a-custom-attribute-using-javascript
    root = root || document.body;
    if(root.hasAttribute(attr) && root.getAttribute(attr) == value) {
      return root;
    }
    var children = root.children,
      element;
    for(var i = children.length; i--; ) {
      element = this.getElementByAttribute(attr, value, children[i]);
      if(element) {
        return element;
      }
    }
    return null;
  }
}
