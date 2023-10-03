import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.less']
})
export class DeckComponent {

  @Input({ required: true }) deck: number[] = [];

  ngAfterViewInit() {
    if (this.deck.length == 0) {
      console.log('no deck given');
      return;
    }
    console.log('initial deck length is ' + this.deck.length);
  }

  gOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES input**************/
     console.log('deck length is now ' + this.deck.length);
   }  

  

}
