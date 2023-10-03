
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { EventEmitterService } from 'src/_services/event-emitter.service';



@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.less'],


})
export class HandComponent {
  ee: Subscription  = new Subscription; 

  @Input({ required: true }) hand: number[] = [];

  //hand: number[] = [0,1,2];

  ngAfterViewInit() {
    if (this.hand.length == 0) {
      console.log('no hand given');
      return;
    }
    console.log('initial hand length is ' + this.hand.length);
  }

  constructor(
    private eventEmitterService: EventEmitterService,
  ) {
    
  }

  ngOnInit(): void {
    /*this.ee = this.eventEmitterService.invokeRefreshHand.subscribe(() => { 
      console.log('refresh hand');
    

    }); */

  }

  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES input**************/
     console.log('hand length is now ' + this.hand.length);
    }   

}
