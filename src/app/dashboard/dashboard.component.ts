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
    `.dashboard { margin-left: 10px; }
    .remaining-cards {
      float: right;
      display: inline-block;
      margin-top: 15px;
    }`
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
      (remainingCards: number) => this.remainingCards = remainingCards
    );

    this.gameService.state$.subscribe(
      (gs) => {
        this.gameState = gs;
      }
    );

    const bgm = new Audio('assets/sound/bgm.mp3');
    bgm.volume = 0.05;
    // bgm.play();
  }

  start() {
    console.log('start clicked');
    this.gameService.start();
    this.startTimer = true;
    return false; // don't propagate click event
  }
  restart() {
    console.log('restart clicked');
    this.gameService.start();
    this.restartTimer = true;
    return false; // don't propagate click event
  }
  end() {
    console.log('end clicked');
    this.gameService.end();
    this.stopTimer = true;
    return false; // don't propagate click event
  }

}
