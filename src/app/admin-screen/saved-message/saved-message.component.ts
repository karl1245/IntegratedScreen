import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {savingAnimation} from '../../shared/animations';

@Component({
  selector: 'app-saved-message',
  templateUrl: './saved-message.component.html',
  styleUrls: ['./saved-message.component.css'],
  animations: [
    savingAnimation
  ]
})
export class SavedMessageComponent implements OnInit {
  @Input() message: string = 'Saved';
  @Input() saving: boolean;
  @Output() saved = new EventEmitter();

  animationDone() {
    this.saving = false;
    this.saved.emit();
  }

  constructor() {
  }

  ngOnInit() {
  }

}
