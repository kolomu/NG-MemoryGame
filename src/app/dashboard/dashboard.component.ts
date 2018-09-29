import { Component } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dashboard',
  template: `
  <div class="dashboard">
    <a href class="button primary" id="start-button" (click)="start()">start</a>
    <a href class="button" id="restart-button" (click)="restart()">restart</a>
    <a href class="button secondary" id="end-button" (click)="end()">end</a>
    <span class="remaining-cards">Cards Remaining: {{remainingCards}}</span>
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

  constructor(private gameService: GameService) {
    this.gameService.remainingCards$.subscribe(
      (remainingCards: number) => this.remainingCards = remainingCards
    );
  }

  start() {
    this.gameService.start();
    console.log('start clicked');
    return false; // don't propagate click event
  }
  restart() {
    console.log('restart clicked');
    return false; // don't propagate click event
  }
  end() {
    console.log('end clicked');
    return false; // don't propagate click event
  }

}
