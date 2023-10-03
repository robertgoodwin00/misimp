import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GameService } from 'src/_services/game.service';
import { ImageMapComponent } from './imagemap/imagemap.component';
import { TextboxComponent } from './textbox/textbox.component';
import { MapComponent } from './map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { DeckComponent } from './deck/deck.component';
import { HandComponent } from './hand/hand.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ImageMapComponent,
    TextboxComponent,
    MapComponent,
    CardComponent,
    DeckComponent,
    HandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required for angular animations to work!
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
