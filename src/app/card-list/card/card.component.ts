import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  card: Card;
  protected flip = false;

  @Output() cardSelection = new EventEmitter<Card>();

  constructor() {}

  ngOnInit() {}

  onCardClick() {
    let allowedToFlip = false;

    if (!this.flip) {
      allowedToFlip = true;
    }

    // check if this card is flipable
    if (allowedToFlip) {
      this.flipCard();
      this.cardSelection.emit(this.card);
    }
  }

  private flipCard() {
    this.flip = !this.flip;
  }

  rotate() {
    if (!this.card.matched) {
      this.flip = !this.flip;
    }
  }
}
