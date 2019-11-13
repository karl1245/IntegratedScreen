import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.css']
})
export class InformationModalComponent implements OnInit {
  @Input() header: string;
  @Input() info: string;

  constructor(public dialogRef: MatDialogRef<InformationModalComponent>) {
  }

  ngOnInit() {
  }

}
