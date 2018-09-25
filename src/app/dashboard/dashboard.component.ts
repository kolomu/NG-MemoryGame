import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  remainingCards: number;

  constructor(private gameService: GameService) {
    this.gameService.remainingCards$.subscribe(
      (remainingCards: number) => this.remainingCards = remainingCards
    );
  }

  ngOnInit() {   }

  start() {
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
