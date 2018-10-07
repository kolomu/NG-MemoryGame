import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from './card';
import { CardService } from '../../card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card: Card;
  @Input() flip = false;
  @Output() cardSelection = new EventEmitter<Card>();
  clicked = false;

  constructor(private cardService: CardService) {
    this.cardService.flipCard$.subscribe(
      (card: Card) => {
        if (this.card.id === card.id) {
          this.clicked = true;
          this.flipCard();
        } else {
          this.clicked = false;
        }
      }
    );
  }

  onCardClick() {
    if (!this.card.matched) {
      this.cardSelection.emit(this.card);
    } else {
      console.log('This card is already matched :)');
    }
  }

  flipCard() {
    this.flip = !this.flip;
  }

}
