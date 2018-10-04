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
    this.timeElapsed = 0;
    // remove previous timer if fn is run multiple times
    if (this.timerId) {
      clearInterval(this.timerId);
    }
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

  // should return time in a format like this: 00:00
  protected formatToTime(time: number): string {
    if (!this.timeElapsed) {
      return;
    }
    let timeString = time.toString();
    const timeStringUnmodified = time.toString();

    if (timeStringUnmodified.length < 3) {
      timeString = '00:' + timeString;
    }

    if (timeStringUnmodified.length === 3) {
      timeString = '0' + timeString.charAt(0) + ':' + timeStringUnmodified.substring(1);
    }

    if (timeStringUnmodified.length > 3) {
      timeString = this.stringInsert(timeStringUnmodified, ':', 2);
    }

    return timeString;
  }

  private stringInsert(inputString: string, insertString: string, position: number): string {
    const fullInputString = inputString;
    return inputString.slice(0, position) + insertString + fullInputString.substring(position);
  }
}
