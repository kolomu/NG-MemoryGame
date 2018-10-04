import { Component } from '@angular/core';
import { CardService } from '../card.service';
import { Card } from '../card-list/card/card';
import { GameService, GameState } from '../game.service';

@Component({
  selector: 'app-skill',
  template: `
  <div style="inline-block">
  <h3>Skill-Bar:</h3>
  <mat-progress-bar mode="determinate" [color]="skillColor" [value]="skill"></mat-progress-bar>
  </div>
  `,
  styles: [
    `
      span {
        color: blue;
      }
    `
  ]
})
export class SkillComponent {
  amountOfCards = 0;
  optimalFlips = 0;
  currentFlips = 0;
  skill = 100;
  skillColor = '#006600';

  constructor(private cardService: CardService, private gameService: GameService) {
    this.amountOfCards = this.cardService.cards.length;
    this.optimalFlips = this.amountOfCards * 2;

    this.gameService.state$.subscribe(
      (gameState: GameState) => {
        if (gameState === GameState.START) {
          this.skill = 100;
          this.currentFlips = 0;
        }
      }
    );

    this.cardService.flipCard$.subscribe((card: Card) => {
      this.currentFlips += 0.5;
      this.skill = 100;
      this.calculateSkill();
    });
  }

  calculateSkill() {
    if (this.currentFlips < this.optimalFlips) {
      return;
    }
    const subtractAmount = (this.currentFlips - this.optimalFlips) * 10;
    if (subtractAmount < 100) {
      this.skill = this.skill - subtractAmount;
      if (this.skill < 70) {
        this.skillColor = 'orange';
      }
      if (this.skill < 35) {
        this.skillColor = 'red';
      }
    } else {
      this.skill = 0;
      this.skillColor = 'red';
    }
  }
}
