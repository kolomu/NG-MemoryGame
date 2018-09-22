import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlipModule } from 'ngx-flip';

import { AppComponent } from './app.component';
import { CardComponent } from './card-list/card/card.component';
import { CardListComponent } from './card-list/card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardListComponent
  ],
  imports: [
    BrowserModule,
    FlipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
