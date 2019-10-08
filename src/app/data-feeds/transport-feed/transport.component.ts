import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransportService} from '../../shared/transport/transport.service';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit{
  transport: Transport;
  transportSub: Subscription;

  constructor(private transportService: TransportService) {}

  ngOnInit() {
      this.transportSub = this.transportService.transportSubject.subscribe(response => {
          if (response) {
            this.transport = response.transport;
          }
        });
  }
}

