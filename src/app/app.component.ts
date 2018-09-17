import { Component } from '@angular/core';
import { Card } from './card/card';
import { CardService } from './card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly frontImagePath = '../assets/front.jpg';
  cards: Card[] = [];

  constructor(private cardService: CardService) {
    try {
      this.cardService.createCard(new Card(this.frontImagePath, '../assets/back1.jpg'));
      this.cardService.createCard(new Card(this.frontImagePath, '../assets/back2.jpg'));
      this.cardService.createCard(new Card(this.frontImagePath, '../assets/back3.jpg'));
      this.cards = this.cardService.cards;
    } catch (err) {
      console.log('Some error happened while creating the cards...');
      console.log(err);
    }
  }


}
