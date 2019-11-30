import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {InfoModalService} from '../../shared/info-modal.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AirportService} from '../../shared/airport/airport.service';

@Component({
  selector: 'app-airport-admin',
  templateUrl: './airport-admin.component.html',
  styleUrls: ['./airport-admin.component.css', '../admin-screen.component.css']
})
export class AirportAdminComponent implements OnInit {
  airportForm: FormGroup;

  isArrival = true;

  airportSaved = false;

  constructor(public dialog: MatDialog,
              public infoModalService: InfoModalService,
              public airportService: AirportService) { }

  ngOnInit() {
    this.isArrival = this.airportService.isArrival;
    this.airportForm = new FormGroup({
      'isArrival': new FormControl(this.isArrival)
    });
  }

  onSaveAorD() {
    this.airportSaved = true;
    this.isArrival = this.airportForm.value.isArrival;
    this.airportService.isArrival = this.airportForm.value.isArrival;
  }

  openInfo() {
    this.infoModalService.openInfoAirport(this.dialog);
  }

}
