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
  @Input() protected flip = false;
  @Output() cardSelection = new EventEmitter<Card>();

  constructor(private cardService: CardService) {
    this.cardService.flipCard$.subscribe(
      (card: Card) => {
        if (this.card.id === card.id) {
          this.flipCard();
        }
      }
    );
  }

  onCardClick() {
      this.cardSelection.emit(this.card);
  }

  flipCard() {
    this.flip = !this.flip;
  }

}
