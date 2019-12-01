import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-information-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<InfoModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {header: string, headerInfo: string, info: {header: string, info: string[]}[]}) {
  }

  ngOnInit() {
  }

}
