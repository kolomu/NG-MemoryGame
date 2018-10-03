import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timer',
  template: `
    <span *ngIf="timeElapsed !== 0">Time: {{this.formatToTime(timeElapsed)}}</span>
  `
})
export class TimerComponent {
  timeElapsed = 0;
  private timerId;

  @Input()
  set start(shouldStart: boolean) {
    if (shouldStart) {
      this.startTimer();
    }
  }

  @Input()
  set stop(shouldStop: boolean) {
    if (shouldStop) {
      this.stopTimer();
    }
  }

  @Input()
  set restart(shouldRestart: boolean) {
    if (shouldRestart) {
      this.restartTimer();
    }
  }

  private startTimer() {
    this.timerId = setInterval(() => this.increaseCount(1), 10);
  }

  private stopTimer() {
    clearInterval(this.timerId);
  }

  private restartTimer() {
    this.stopTimer();
    this.timeElapsed = 0;
    this.startTimer();
  }

  private increaseCount(amount: number) {
    this.timeElapsed += amount;
  }

  // should return time in a format like this: 00:000
  protected formatToTime(time: number): string {
    if (!this.timeElapsed) {
      return;
    }

    return time.toString();
  }
}
