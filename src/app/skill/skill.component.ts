import { Component } from '@angular/core';
import { CardService } from '../card.service';
import { Card } from '../card-list/card/card';
import { GameService, GameState } from '../game.service';

@Component({
  selector: 'app-skill',
  template: `
  <div class="skill-cmp">
  <strong>Skill</strong>
  <mat-progress-bar mode="determinate" [color]="skillColor" [value]="skill"></mat-progress-bar>
  </div>
  `,
  styles: [`
    span {
      color: blue;
    }

    .skill-cmp {
      padding-top:15px;
      padding-bottom:10px;
    }

    .mat-progress-bar {
      display: inline-block;
      height: 15px;
      width: 592px;
      margin-left: 15px;
    }
  `]
})
export class SkillComponent {
  amountOfCards = 0;
  optimalFlips = 0;
  currentFlips = 0;
  skill = 100;
  skillColor = '#006600';

  constructor(private cardService: CardService, private gameService: GameService) {
    this.amountOfCards = this.cardService.cards.length;
    this.optimalFlips = this.amountOfCards * 1.5;

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
      this.gameService.skill$.next(100);
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

    this.gameService.skill$.next(this.skill);
  }
}
