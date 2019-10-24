import { Component, OnInit } from '@angular/core';
import {UpdateDataTimerService} from '../shared/updateDataTimer.service';

@Component({
  selector: 'app-data-feeds',
  templateUrl: './data-feeds.component.html',
  styleUrls: ['./data-feeds.component.css']
})
export class DataFeedsComponent implements OnInit {

  constructor(private updateTimerService: UpdateDataTimerService) { }

  ngOnInit() {
  }

}
