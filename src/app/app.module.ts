import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressBarModule, MatButtonModule } from '@angular/material';

import { FlipModule } from 'ngx-flip';

import { AppComponent } from './app.component';
import { CardComponent } from './card-list/card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimerComponent } from './timer/timer.component';
import { SkillComponent } from './skill/skill.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    DashboardComponent,
    TimerComponent,
    SkillComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlipModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
