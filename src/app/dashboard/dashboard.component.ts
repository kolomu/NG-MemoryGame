import { Component } from '@angular/core';
import { GameService, GameState } from '../game.service';

@Component({
  selector: 'app-dashboard',
  template: `
  <div class="dashboard">
    <a href class="button primary" id="start-button" (click)="start()">start</a>
    <a href class="button" id="restart-button" (click)="restart()">restart</a>
    <a href class="button secondary" id="end-button" (click)="end()">end</a>
    <span class="remaining-cards" *ngIf="gameState === 1 || gameState === 2">Cards Remaining: {{ remainingCards }}</span>
    <app-timer [start]="startTimer" [stop]="stopTimer" [restart]="restartTimer"></app-timer>
  </div>
  `,
  styles: [
    `
      .dashboard {
        margin-left: 10px;
      }
      .remaining-cards {
        float: right;
        display: inline-block;
        margin-top: 15px;
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
    this.gameService.end();
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
}
