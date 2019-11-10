import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { TransportService } from 'src/app/shared/transport/transport.service';

@Component({
  selector: 'app-transport-admin',
  templateUrl: './transport-admin.component.html',
  styleUrls: ['./transport-admin.component.css', '../admin-screen.component.css']
})
export class TransportAdminComponent implements OnInit {
  transportLocation: string;
  transportForm: FormGroup;
  constructor(private transportService: TransportService) { }

  ngOnInit() {
    this.transportLocation = "";
    this.transportForm = new FormGroup({
      'transportLocation': new FormControl(this.transportLocation)
    });
  }

}
