import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { TransportService } from 'src/app/shared/transport/transport.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-transport-admin',
  templateUrl: './transport-admin.component.html',
  styleUrls: ['./transport-admin.component.css', '../admin-screen.component.css']
})
export class TransportAdminComponent implements OnInit {
  transportForm: FormGroup;
  APIkey: string;
  APIKeyForm: FormGroup;
  weatherReqForm: FormGroup;
  errorSub: Subscription;
  errorMessage: string;

  constructor(private transportService: TransportService) { }

  ngOnInit() {
    this.APIkey = this.transportService.APIKey;
    this.APIKeyForm = new FormGroup({
      'APIKey': new FormControl(this.transportService.APIKey)
    });

    this.errorSub = this.transportService.errorSubject.subscribe(error => {
      this.errorMessage = error;
    });
  }

  onSaveAPIKey() {
    this.transportService.APIKey = this.APIKeyForm.value.APIKey;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
