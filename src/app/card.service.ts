import { Injectable } from '@angular/core';
import { Card } from './card-list/card/card';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly _cards: Card[] = [];
  public flipCard$ = new Subject<Card>();

  constructor() { }

  get cards() {
    this.shuffleCards();
    this.flipAllCardsToBack();
    return this._cards;
  }

  public createCard(card: Card) {
    // check if card with this back image already exist, if yes don't create!
    if (this._cards.some(c => c.backImage === card.backImage)) {
      throw Error('Card with that front image already exists!');
    } else {
      const tmpCard = { ...card, id: 10000 + card.id };
      this._cards.push(card, tmpCard);
    }
  }

  // Fisher-Yates shuffle src: https://bost.ocks.org/mike/shuffle/
  private shuffleCards() {
    let m = this._cards.length;
    // While there are elements to shuffle
    while (m) {
      // Pick a remaining element
      const i = Math.floor(Math.random() * m--);
      // swap it with current element
      const t = this._cards[m];
      this._cards[m] = this._cards[i];
      this._cards[i] = t;
    }
  }

  private flipAllCardsToBack() {
    this._cards.forEach(card => card.flipped = false);
  }

  // Compare the cards based on the front image
  // Do not give the function identical cards (same position).
  // This should be handled in the UI else I need to use IDs for each card...
  public cardComparison(card1: Card, card2: Card) {
    return card1.backImage === card2.backImage;
  }

  public flipCard(card: Card) {
    card.flipped = !card.flipped;
    this.flipCard$.next(card);
  }
}
