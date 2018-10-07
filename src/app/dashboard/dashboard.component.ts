import { Component } from '@angular/core';
import { GameService, GameState } from '../game.service';

@Component({
  selector: 'app-dashboard',
  template: `
  <div class="dashboard">
    <button mat-raised-button color="primary"
      class="mat-button"
      (click)="start()"
      id="start-button">Start</button>
    <button mat-raised-button color="accent"
      class="mat-button"
      [ngClass]="{'hidden': !gameState || gameState !== 1 }"
      (click)="restart()"
      id="restart-button">Restart</button>
    <button mat-raised-button color="warn"
      class="mat-button"
      [ngClass]="{'hidden': !gameState || gameState !== 1 }"
      (click)="end()"
      id="end-button">End</button>
    <span class="remaining-cards" *ngIf="gameState === 1 || gameState === 2">Cards Remaining: {{ remainingCards }}</span>
    <app-timer [start]="startTimer" [stop]="stopTimer" [restart]="restartTimer" (timeEE)="updateTime($event)"></app-timer>
    <app-skill *ngIf="gameState === 1 || gameState === 2"></app-skill>
  </div>
  `,
  styles: [
    `
      .dashboard {
        margin-left: 14px;
      }
      .remaining-cards {
        float: right;
        display: inline-block;
        margin-top: 5px;
      }
      .mat-button {
        margin-right: 10px;
      }

      .hidden {
        display: none;
      }
    `
  ]
})
export class DashboardComponent {
  remainingCards: number;
  gameState: GameState;

  protected startTimer = false;
  protected stopTimer = false;
  protected restartTimer = false;

  constructor(private gameService: GameService) {
    this.gameService.remainingCards$.subscribe(
      (remainingCards: number) => (this.remainingCards = remainingCards)
    );

    this.gameService.state$.subscribe(gs => {
      this.gameState = gs;

      switch (gs) {
        case GameState.START: {
          this.startTimerFn();
          break;
        }
        case GameState.END: {
          this.stopTimerFn();
          break;
        }
        case GameState.ENDWIN: {
          this.stopTimerFn();
          break;
        }
      }
    });

    const bgm = new Audio('assets/sound/bgm.mp3');
    bgm.volume = 0.05;
    // bgm.play();
  }

  start() {
    this.gameService.start();
    this.startTimerFn();
    return false; // don't propagate click event
  }
  restart() {
    this.gameService.start();
    this.restartTimerFn();
    return false; // don't propagate click event
  }
  end() {
    this.gameService.endLose();
    this.stopTimerFn();
    return false; // don't propagate click event
  }

  private startTimerFn() {
    this.startTimer = false;
    // problem with input binding setters (timer.component.ts) is that property needs
    // to be changed else angular is clever enough to not run this code!
    // start timer after 1 second because of waiting for animations to finish.
    setTimeout(() => {
      this.startTimer = true;
    }, 1000);
  }

  private restartTimerFn() {
    this.restartTimer = false;
    setTimeout(() => {
      this.restartTimer = true;
    }, 0);
  }

  private stopTimerFn() {
    this.stopTimer = false;
    setTimeout(() => {
      this.stopTimer = true;
    }, 0);
  }

  updateTime(time: number) {
    this.gameService.time$.next(time);
  }

}
