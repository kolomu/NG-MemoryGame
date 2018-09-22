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
  activeCard1: Card;
  activeCard2: Card;

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

  private setCard(card: Card) {
    if (!this.activeCard1) {
      this.activeCard1 = card;
      this.cardService.flipCard$.next(card);
    } else {
      this.activeCard2 = card;
      this.cardService.flipCard$.next(card);
    }
  }

  handleCardSelection(card: Card) {
    if (this.activeCard1 && this.activeCard2) {
      const isMatch = this.cardService.cardComparison(this.activeCard1, this.activeCard2);
      if (isMatch) {
        this.activeCard1.matched = true;
        this.activeCard2.matched = true;
      } else {
        this.cardService.flipCard$.next(this.activeCard1);
        this.cardService.flipCard$.next(this.activeCard2);
      }
      this.activeCard1 = null;
      this.activeCard2 = null;
      this.setCard(card);
    } else {
      this.setCard(card);
    }
  }

  ngOnInit() {}
}
