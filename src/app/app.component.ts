import { Component, Injector, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import swal from 'sweetalert';

import { GameService, GameState } from './game.service';
import { FinishModalComponent } from './finish-modal/finish-modal.component';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Memory</h1>
    <app-dashboard></app-dashboard>
    <app-card-list></app-card-list>
  </div>
  `,
  styles: [
    `
      .container {
        max-width: 660px;
        margin: 0 auto;
      }
      h1 {
        margin-left: 20px;
      }
    `
  ]
})
export class AppComponent {
  factory: any;
  component: ComponentRef<FinishModalComponent>;
  time: number;
  skill: number;

  // show finish modal if appropriate
  constructor(
    private _gameService: GameService,
    private _resolver: ComponentFactoryResolver,
    private _injector: Injector
  ) {
    this._gameService.state$.subscribe(gs => {
      if (gs === GameState.START) {
        this.factory = this._resolver.resolveComponentFactory(FinishModalComponent);
        this.component = this.factory.create(this._injector);
      }

      if (gs === GameState.ENDWIN) {
        // setTimeout because event gameState is first triggered before time is stopped...
        // and only when time is stopped the event gets emitted.
        setTimeout(() => {
          this.showModal(true, this.time, this.skill);
        }, 50);
      }

      if (gs === GameState.ENDLOSE) {
        setTimeout(() => {
          this.showModal(false, this.time, this.skill);
        }, 50);
      }
    });

    this._gameService.skill$.subscribe((skill: number) => (this.skill = skill));
    this._gameService.time$.subscribe((time: number) => (this.time = time));
  }

  showModal(win: boolean, time: number, skill: number): void {
    this.component.instance.result = win;
    this.component.instance.time = time;
    this.component.instance.skill = skill;
    this.component.changeDetectorRef.detectChanges();

    swal({
      content: this.component.location.nativeElement
    }).then(() => {
      this.component.destroy();
    });
  }
}
