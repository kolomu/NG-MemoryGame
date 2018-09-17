import { Component } from '@angular/core';
import { Card } from './card/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly frontImagePath = '../assets/front.jpg';
  cards: Card[] = [];

  constructor() {
    this.cards = [
      new Card(this.frontImagePath, '../assets/back1.jpg')
    ]
  }
  
}
