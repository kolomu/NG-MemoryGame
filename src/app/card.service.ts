import { Injectable } from '@angular/core';
import { Card } from './card/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly _cards: Card[] = [];

  constructor() { }

  get cards() {
    this.shuffleCards();
    return this._cards;
  }

  public createCard(card: Card) {
    // check if card with this back image already exist, if yes don't create!
    if (this._cards.some(c => c.backImage === card.backImage)) {
      throw Error('Card with that front image already exists!');
    } else {
      this._cards.push(card, card);
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

}
