import { Component, OnInit, Input } from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  protected flip = false;

  constructor() { }

  ngOnInit() { }

  rotate() {
    if(!this.card.matched) {
      this.flip = !this.flip;
    }
  }


}
