import { Component, OnInit } from '@angular/core';
import { Card } from './card/card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  readonly frontImagePath = '../assets/img/front.png';
  cards: Card[] = [];
  activeCard1: Card;
  activeCard2: Card;
  remainingCards: number;

  constructor(private cardService: CardService) {
    try {
      this.cardService.createCard(new Card(1, this.frontImagePath, '../assets/img/back1.png'));
      this.cardService.createCard(new Card(2, this.frontImagePath, '../assets/img/back2.png'));
      this.cardService.createCard(new Card(3, this.frontImagePath, '../assets/img/back3.png'));
      this.cardService.createCard(new Card(4, this.frontImagePath, '../assets/img/back4.png'));
      this.cardService.createCard(new Card(5, this.frontImagePath, '../assets/img/back5.png'));
      this.cardService.createCard(new Card(6, this.frontImagePath, '../assets/img/back6.png'));
      this.cardService.createCard(new Card(7, this.frontImagePath, '../assets/img/back7.png'));
      this.cardService.createCard(new Card(8, this.frontImagePath, '../assets/img/back8.png'));
      this.cardService.createCard(new Card(9, this.frontImagePath, '../assets/img/back9.png'));
      this.cardService.createCard(new Card(10, this.frontImagePath, '../assets/img/back10.png'));
      this.cardService.createCard(new Card(11, this.frontImagePath, '../assets/img/back11.png'));
      this.cardService.createCard(new Card(12, this.frontImagePath, '../assets/img/back12.png'));
      this.cards = this.cardService.cards;
    } catch (err) {
      console.log('Some error happened while creating the cards...');
      console.log(err);
    }
  }

  ngOnInit() {
    this.remainingCards = this.cardService.cards.length;
  }

  handleCardSelection(card: Card) {
    // check so no cards are selected twice
    if (this.activeCard1) {
      if (this.activeCard1.id === card.id) {
        console.log('same card selected :|');
        return;
      }
    }
    if (this.activeCard2) {
      if (this.activeCard2.id === card.id) {
        console.log('same card selected :|');
        return;
      }
    }

    if (this.remainingCards === 2 && this.activeCard1) {
      this.setCard(card);
      this.cardService.flipCard$.next(card);
      this.handleCardMatch();
      console.log('FINISHED!');
    }

    if (this.activeCard1 && this.activeCard2) {
      this.handleCardMatch();
      this.setCard(card);
    } else {
      this.setCard(card);
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

  private handleCardMatch() {
    const isMatch = this.cardService.cardComparison(this.activeCard1, this.activeCard2);
    if (isMatch) {
      new Audio('assets/sound/correct.ogg').play();
      this.remainingCards -= 2;
      this.activeCard1.matched = true;
      this.activeCard2.matched = true;
    } else {
      this.cardService.flipCard$.next(this.activeCard1);
      this.cardService.flipCard$.next(this.activeCard2);
    }
    this.activeCard1 = null;
    this.activeCard2 = null;
  }

}
