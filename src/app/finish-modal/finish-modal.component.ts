import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-finish-modal',
  template: `
  <h2>{{result ? 'Victory' : 'Defeat'}}</h2>
  <span>Time: {{time}}</span>
  <span *ngIf="skill">Skill: {{skill}}</span>
  `
})
export class FinishModalComponent {

  @Input() result: boolean;
  @Input() time: number;
  @Input() skill: number;

}
