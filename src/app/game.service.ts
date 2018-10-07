import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CardService } from './card.service';

export enum GameState {
  INIT = 0,
  START = 1,
  ENDWIN = 2,
  ENDLOSE = 3,
  END = 4 // this state is so that no modal is shown e.g. restarting
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public state$ = new Subject<GameState>();
  public remainingCards$ = new Subject<number>();
  public skill$ = new Subject<number>();
  public time$ = new Subject<number>();

  constructor(private cardService: CardService) {
    this.state$.next(GameState.INIT);
    this.remainingCards$.subscribe(
      (remainingCards: number) => {
        if (remainingCards === 0) {
          this.state$.next(GameState.ENDWIN);
        }
      }
    );
  }

  start() {
    this.remainingCards$.next(this.cardService.cards.length);
    this.state$.next(GameState.START);
  }

  endLose() {
    this.state$.next(GameState.ENDLOSE);
  }

}
