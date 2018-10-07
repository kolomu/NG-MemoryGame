import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-finish-modal',
  template: `
  <h2>{{result ? 'Victory' : 'Defeat'}}</h2>
  <p>Time <br>{{time | time}}</p>
  <span *ngIf="skill">Skill: {{skill}}</span><br>
  <span *ngIf="result">Points: {{getPoints()}}</span>
  `
})
export class FinishModalComponent {
  @Input() result: boolean;
  @Input() time: number;
  @Input() skill: number;
  _finalTime = 0;

  getPoints() {
    if (this.skill < 100) {
      this._finalTime = this.getPenality();
    }

    this._finalTime += this.time;

    return this._finalTime;
  }

  private getPenality(): number {
    if (this.skill < 20) {
      return 10000;
    }

    if (this.skill < 40) {
      return 5000;
    }

    if (this.skill < 60) {
      return 3000;
    }

    if (this.skill < 80) {
      return 1500;
    }

    if (this.skill < 90) {
      return 1000;
    }

    if (this.skill < 100) {
      return 500;
    }
  }
}
