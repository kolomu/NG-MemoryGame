import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { Card } from './card/card';
import { CardService } from '../card.service';
import { GameService, GameState } from '../game.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('2s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CardListComponent implements OnInit {
  readonly frontImagePath = '../assets/img/front.png';
  cards: Card[] = [];
  activeCard1: Card;
  activeCard2: Card;
  remainingCards: number;
  gameState: GameState;

  constructor(private cardService: CardService, private gameService: GameService) {
    try {
      this.cardService.createCard(new Card(1, this.frontImagePath, '../assets/img/back1.png'));
      this.cardService.createCard(new Card(2, this.frontImagePath, '../assets/img/back2.png'));
      this.cardService.createCard(new Card(3, this.frontImagePath, '../assets/img/back3.png'));
      // this.cardService.createCard(new Card(4, this.frontImagePath, '../assets/img/back4.png'));
      // this.cardService.createCard(new Card(5, this.frontImagePath, '../assets/img/back5.png'));
      // this.cardService.createCard(new Card(6, this.frontImagePath, '../assets/img/back6.png'));
      // this.cardService.createCard(new Card(7, this.frontImagePath, '../assets/img/back7.png'));
      // this.cardService.createCard(new Card(8, this.frontImagePath, '../assets/img/back8.png'));
      // this.cardService.createCard(new Card(9, this.frontImagePath, '../assets/img/back9.png'));
      // this.cardService.createCard(new Card(10, this.frontImagePath, '../assets/img/back10.png'));
      // this.cardService.createCard(new Card(11, this.frontImagePath, '../assets/img/back11.png'));
      // this.cardService.createCard(new Card(12, this.frontImagePath, '../assets/img/back12.png'));
      this.cards = this.cardService.cards;
    } catch (err) {
      console.log('Some error happened while creating the cards...');
      console.log(err);
    }

    this.gameService.state$.subscribe(
      gs => {
        this.gameState = gs;
        // fix remaining cards bug
        if (gs === GameState.START) {
          this.remainingCards = this.cardService.cards.length;
        }
      }
    );
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

    if (this.activeCard1 && !this.activeCard2) {
      this.setCard(card);
      const isFirstCheck = true;
      this.handleCardMatch(isFirstCheck);
    } else if (this.activeCard1 && this.activeCard2) {
      // e.g. first check was false, so check again (for card flipping) and flip new card.
      const isFirstCheck = false;
      this.handleCardMatch(isFirstCheck);
      this.setCard(card);
    } else {
      // set the first card
      this.setCard(card);
    }
  }

  private setCard(card: Card) {
    if (!this.activeCard1) {
      this.activeCard1 = card;
      this.cardService.flipCard(card);
    } else {
      this.activeCard2 = card;
      this.cardService.flipCard(card);
    }
  }

  private handleCardMatch(isFirstCheck: boolean) {
    // firstCheck is after 2 cards are clicked and then evaluated (if wrong DONT turn arround instantly!)
    const isMatch = this.cardService.cardComparison(this.activeCard1, this.activeCard2);
    if (isFirstCheck) {
      if (isMatch) {
        new Audio('assets/sound/correct.ogg').play();

        this.remainingCards -= 2;
        this.gameService.remainingCards$.next(this.remainingCards);
        this.activeCard1.matched = true;
        this.activeCard2.matched = true;
        this.activeCard1 = null;
        this.activeCard2 = null;
      }
    } else {
      // is not first check (e.g. someone clicked on third card)
      if (!isMatch) {
        this.cardService.flipCard(this.activeCard1);
        this.cardService.flipCard(this.activeCard2);
        this.activeCard1 = null;
        this.activeCard2 = null;
      }
    }
  }
}
