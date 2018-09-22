import { Component, OnInit } from '@angular/core';
import { Card } from './card/card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  readonly frontImagePath = '../assets/front.jpg';
  cards: Card[] = [];
  activeCard: Card;

  constructor(private cardService: CardService) {
    try {
      this.cardService.createCard(new Card(1, this.frontImagePath, '../assets/back1.jpg'));
      this.cardService.createCard(new Card(2, this.frontImagePath, '../assets/back2.jpg'));
      this.cardService.createCard(new Card(3, this.frontImagePath, '../assets/back3.jpg'));
      this.cards = this.cardService.cards;
    } catch (err) {
      console.log('Some error happened while creating the cards...');
      console.log(err);
    }
  }

  handleCardSelection(card: Card) {
    if (this.activeCard) {
      if (this.activeCard.id !== card.id) {
        this.cardService.flipCard(card);
        this.activeCard = card;
      }
    } else {
      this.cardService.flipCard(card);
      this.activeCard = card;
    }
  }

  ngOnInit() {}
}
