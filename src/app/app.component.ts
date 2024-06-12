import { animate, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { fadeInFromRight, fadeOutToRight } from './animations/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('myAnimation', [
      transition(':enter', [
        useAnimation(fadeInFromRight,{
          params:{
            duration: '400ms',
            easing:'ease-out'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(fadeOutToRight)
      ])
    ])
  ]
})
export class AppComponent {
  title = 'learn';
  visibility = true;

  print() {
    window.print();
  }

  toggleVisibility() {
    this.visibility = !this.visibility;
  }
}
