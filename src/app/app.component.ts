import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Memory</h1>
    <app-dashboard></app-dashboard>
    <app-card-list></app-card-list>
  </div>
  `,
  styles: [`
  .container {
    width: 1000px;
    margin: 0 auto;
  }
  h1 {
    margin-left: 20px;
  }
  `]
})
export class AppComponent { }
