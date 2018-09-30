import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CardService } from './card.service';

export enum GameState {
  INIT = 0,
  START = 1,
  END = 2
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public state$ = new Subject<GameState>();
  public remainingCards$ = new Subject<number>();

  constructor(private cardService: CardService) {
    this.state$.next(GameState.INIT);
    this.remainingCards$.subscribe(
      (remainingCards: number) => {
        if (remainingCards === 0) {
          this.state$.next(GameState.END);
        }
      }
    );
  }

  start() {
    this.remainingCards$.next(this.cardService.cards.length);
    this.state$.next(GameState.START);
  }

  end() {
    this.state$.next(GameState.END);
  }

}
