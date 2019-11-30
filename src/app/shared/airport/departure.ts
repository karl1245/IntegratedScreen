/**
 * Departures object for Airport.
 */
export class Departure {
  constructor(time: string, to: string, flights: string[], airlines: string[], information: string) {
    this.time = time;
    this.to = to;
    this.flights = flights;
    this.airlines = airlines;
    this.information = information;
  }

  time: string;
  to: string;
  flights: string[];
  airlines: string[];
  information: string;

}
