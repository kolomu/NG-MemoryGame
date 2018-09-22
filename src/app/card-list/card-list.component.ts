import { Component, OnInit } from '@angular/core';
import { Card } from './card/card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  readonly frontImagePath = '../assets/front.png';
  cards: Card[] = [];
  activeCard1: Card;
  activeCard2: Card;
  remainingCards: number;

  constructor(private cardService: CardService) {
    try {
      this.cardService.createCard(new Card(1, this.frontImagePath, '../assets/back1.png'));
      this.cardService.createCard(new Card(2, this.frontImagePath, '../assets/back2.png'));
      this.cardService.createCard(new Card(3, this.frontImagePath, '../assets/back3.png'));
      this.cardService.createCard(new Card(4, this.frontImagePath, '../assets/back4.png'));
      this.cardService.createCard(new Card(5, this.frontImagePath, '../assets/back5.png'));
      this.cardService.createCard(new Card(6, this.frontImagePath, '../assets/back6.png'));
      this.cardService.createCard(new Card(7, this.frontImagePath, '../assets/back7.png'));
      this.cardService.createCard(new Card(8, this.frontImagePath, '../assets/back8.png'));
      this.cardService.createCard(new Card(9, this.frontImagePath, '../assets/back9.png'));
      this.cardService.createCard(new Card(10, this.frontImagePath, '../assets/back10.png'));
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
