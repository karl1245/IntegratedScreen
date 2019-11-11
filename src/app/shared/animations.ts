import {
  trigger, transition, animate, style, state
} from '@angular/animations';

export const savingAnimation =
  trigger('saved', [
    state('in', style({opacity: 1})),
    state('out', style({opacity: 0})),
    transition('in => out', [
      animate(800)
    ]),
    transition('out => in', [
      animate(400)
    ])
  ]);
