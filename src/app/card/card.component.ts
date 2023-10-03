import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { EventEmitterService } from 'src/_services/event-emitter.service';
//import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  animations: [
    //animation triggers go here


    trigger('clickCardTrigger', [
      state('start', style ({
        opacity: 1,
      })),
      state('end', style ({
        opacity: 0,
      })),
      transition('start => end', [
        animate('1.8s')

      ]),
      transition('end => start', [
        animate('.1s'),
      ]),
    ]),
  ],

})
export class CardComponent {
  //@Input({ required: true }) id: number = -1;
  @Input({ required: true }) value: number = -1;


  clickedCard: Boolean = false;


  constructor(
    private eventEmitterService: EventEmitterService ,
  ) {

  }

  ngAfterViewInit() {
    if (!this.value) {
      console.log('no card value given');
      return;
    }
  }

  clickCard() {
    console.log('clicked on value ' + this.value) ;

    this.clickedCard = true;
  }

  afterClickCard() {
    if (this.clickedCard) {
      console.log('after click card value ' + this.value);
      this.eventEmitterService.RemoveCardFromHand(this.value);
      this.clickedCard = false;
    }

   
    
  }

  cardLink() : string {
    let path = "../assets/cards/icons/";
    let iconpath = "";
    switch(this.value) {
      case 0: iconpath = "heart-heart-svgrepo-com"; break;
      case 1: iconpath = "comb-svgrepo-com"; break;
      case 2: iconpath = "footprints-svgrepo-com"; break;
      case 3: iconpath = "laugh-svgrepo-com"; break;
      case 4: iconpath = "money-svgrepo-com"; break;
      case 5: iconpath = "two-hearts-svgrepo-com"; break;
      case 6: iconpath = "wine-glass-svgrepo-com"; break;
      case 7: iconpath = "wine-glass2-svgrepo-com"; break;
      case 8: iconpath = "comb2-svgrepo-com"; break;
    }
    return path + iconpath + ".svg";
  }

}
