/**
 * Arrivals object for Airport.
 */
export class Arrival {
  constructor(time: string, from: string, flights: string[], airlines: string[], information: string) {
    this.time = time;
    this.from = from;
    this.flights = flights;
    this.airlines = airlines;
    this.information = information;
  }

  time: string;
  from: string;
  flights: string[];
  airlines: string[];
  information: string;
}
