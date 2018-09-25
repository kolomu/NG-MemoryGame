import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlipModule } from 'ngx-flip';

import { AppComponent } from './app.component';
import { CardComponent } from './card-list/card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FlipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
