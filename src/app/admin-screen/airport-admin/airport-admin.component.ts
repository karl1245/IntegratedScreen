import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {InfoModalService} from '../../shared/info-modal.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AirportService} from '../../shared/airport/airport.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-airport-admin',
  templateUrl: './airport-admin.component.html',
  styleUrls: ['./airport-admin.component.css', '../admin-screen.component.css']
})
export class AirportAdminComponent implements OnInit, OnDestroy {
  airportForm: FormGroup;

  isArrival = true;

  errorSub: Subscription;
  errorMessage: string;

  airportSaved = false;

  constructor(public dialog: MatDialog,
              public infoModalService: InfoModalService,
              public airportService: AirportService) { }

  ngOnInit() {
    this.isArrival = this.airportService.isArrival;
    this.airportForm = new FormGroup({
      'isArrival': new FormControl(this.isArrival)
    });
    this.errorSub = this.airportService.errorSubject.subscribe(error => {
      this.errorMessage = error;
    })
  }

  onSaveAorD() {
    this.airportSaved = true;
    this.isArrival = this.airportForm.value.isArrival;
    this.airportService.isArrival = this.airportForm.value.isArrival;
    this.airportService.getAirport();
  }

  openInfo() {
    this.infoModalService.openInfoAirport(this.dialog);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }



}
