import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public remainingCards$ = new Subject<number>();

  constructor(private cardService: CardService) { }

  start() {
    this.remainingCards$.next(this.cardService.cards.length);
  }

}
