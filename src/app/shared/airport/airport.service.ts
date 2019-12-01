import {StorageService} from '../storage.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, take} from 'rxjs/operators';
import {Arrival} from './arrival';
import {Departure} from './departure';
import {BehaviorSubject, Subject} from 'rxjs';

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

  errorSubject = new BehaviorSubject<string>(null);

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

  /**
   * Gets all arrivals or departures depending on user's choice.
   */
  getAirport() {
    if (this.isArrival) {
      this.getArrivalsOutOfHTML();
    } else {
      this.getDeparturesOutOfHTML();
    }
  }

  /**
   * Makes a http request to proxy server on localhost port 3000 and gets arrivals out of Tallinn airport website.
   * Then sends it through airportArrivalSubject or airportDepartureSubject.
   */
  private getArrivalsOutOfHTML() {
    this.http.get('http://localhost:3000/arrivals', {responseType: 'text'}).pipe(
      take(1),
      map(response => {
        return this.getAorD(response);
      })
    ).subscribe(
      arrivals => {
        this.errorSubject.next(null);
        this.airportArrivalSubject.next(arrivals);
      }, error => {
        this.errorSubject.next(error.message + " - " + "Maybe the proxy server is not running?");
      });
  }

  /**
   * Makes a http request to proxy server on localhost port 3000 and gets departures out of Tallinn airport website.
   */
  private getDeparturesOutOfHTML() {
    this.http.get('http://localhost:3000/departures', {responseType: 'text'}).pipe(
      take(1),
      map(response => {
        return this.getAorD(response);
      })
    ).subscribe(
      departures => {
        this.errorSubject.next(null);
        this.airportDepartureSubject.next(departures);
      }, error => {
        this.errorSubject.next(error.message + " - " + "Maybe the proxy server is not running?");
      });
  }

  /**
   * Reads Tallinn airport arrival or departure table into Arrival or Departure objects and returns an array of them.
   * @param response - html response from proxy server.
   */
  private getAorD(response) {
    let airportTable = [];

    const htmlString = response;
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = htmlString;
    const table = this.getElementByAttribute("data-flights-type", this.isArrival ? "arrivals" : "departures", htmlObject);
    const rows = table.querySelectorAll('.t-row:not(.hidden)');

    for(var i = 1; i < rows.length; i++) {
      const row = rows.item(i);
      if(row.getElementsByClassName("col-1-text").item(0) != null) {
        const time = this.getTime(row);
        const info = this.getInfo(row);
        const flights = this.getFlights(row);
        const airlines = this.getAirlines(row);
        const toFrom = this.getToFrom(row);
        if(this.isArrival) {
          const arrival = new Arrival(time, toFrom, flights, airlines, info);
          airportTable.push(arrival)
        } else {
          const departure = new Departure(time, toFrom, flights, airlines, info);
          airportTable.push(departure);
        }
      }
    }
    return airportTable;
  }

  /**
   * Gets plane arrival or departure time from row in table from Tallinn airport website.
   * @param row - row in the table of arrivals/departures.
   */
  private getTime(row) {
    return row.getElementsByClassName("col-1-text").item(0).textContent.trim();
  }

  /**
   * Gets airlines "to" or "from" from row in table from Tallinn airport website. Depending whether the table is arrivals or departures
   * @param row - row in the table of arrivals/departures.
   */
  private getToFrom(row) {
    return row.getElementsByClassName("col-2-text").item(0).textContent.trim();
  }

  /**
   * Gets information about fight from row in table from Tallinn airport website.
   * @param row - row in the table of arrivals/departures.
   */
  private getInfo(row) {
    return row.getElementsByClassName("col-5-text").item(0).textContent.trim();
  }

  /**
   * Gets flight numbers from row in table from Tallinn airport website.
   * @param row - row in the table of arrivals/departures.
   */
  private getFlights(row) {
    return this.getArray(row, "col-3-text")
  }

  /**
   * Gets airlines from row in table from Tallinn airport website.
   * @param row - row in the table of arrivals/departures.
   */
  private getAirlines(row) {
    return this.getArray(row, "col-4-text");
  }

  /**
   * Gets array of either flight no (col-3-text) or airline name (col-4-text) from Tallinn airport website.
   * @param row - row in the table of arrivals/departures.
   * @param className - eiter col-3-text or col-4-text, given above.
   */
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

  /**
   * Gets elements out of html where there is a given attribute. Example [data-flights-type]="arrivals"
   * @param attr - attribute name.
   * @param value - attribute value.
   * @param root - root of the html node.
   */
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
