import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  exportAs: 'time'
})

export class ClockComponent implements OnInit, OnDestroy{
  now: number;

  constructor() {
    setInterval(() => {
      this.now = Date.now();
    }, 1);
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
