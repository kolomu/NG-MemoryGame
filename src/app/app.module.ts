import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlipModule } from 'ngx-flip';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FlipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
