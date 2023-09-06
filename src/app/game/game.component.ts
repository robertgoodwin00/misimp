import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { GameService } from 'src/_services/game.service';
import { ImageMapComponent, ImageMapCoordinate } from 'src/app/imagemap/imagemap.component';
import { TextboxComponent } from '../textbox/textbox.component';
import { Constants } from 'src/constants';
import { EventEmitterService } from 'src/_services/event-emitter.service';
import { Subscription } from 'rxjs';
import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less'],
  animations: [
    // for map
    trigger('GeneralFade', [
      state('out', style({ opacity: '0', })),
      state('in', style({ opacity: '1', })),
      // not sure if we need the fast ones
      state('outfast', style({ opacity: '0', })),
      state('infast', style({ opacity: '1', })),

      transition('* => out', [ animate('1.2s'), ]),
      transition('* => in', [ animate('1.2s'), ]),
      transition('* => outfast', [ animate('.4s'), ]),
      transition('* => infast', [ animate('.4s'), ]),
    ]),

    // darken and lighten. not sure if we'll use this
    trigger('Darken', [
      state('darken', style({ filter: 'brightness(0%)', })),
      state('lighten', style({ filter: 'brightness(100%)', })),
      transition('* => darken', [ animate(2500), ]),
      transition('* => lighten', [ animate(2500), ]),

    ]),

  ],
})
export class GameComponent implements OnInit {
  currentScenario: any;
  currentRoom: any;

  displayMap: Boolean = true;
  displayMapText = "HIDE";

  displayTachie: Boolean = false;

  seed: number = -1;
  
  ee: Subscription  = new Subscription; 


  //@ViewChild('textbox', { static: true }) textbox!: TextboxComponent;
  @ViewChild(TextboxComponent) otextbox!: TextboxComponent;
  ngAfterViewInit() {
    this.otextbox.newMessage('fifi'); // I am a pup component!
  }

  constructor(
    private gameService: GameService,
    private eventEmitterService: EventEmitterService ,
  ) {
    this.seed = Constants.seed;
  }



  ngOnInit(): void {
    this.loadScenario(0);
    this.loadRoom();

    this.ee = this.eventEmitterService.movePlayer.subscribe((dir) => { 
        console.log('try go ' + dir);
        switch(dir) {
          case 0: this.tryShiftLeft(); break;
          case 1: this.tryShiftRight(); break;
          case 2: this.tryShiftUp(); break;
          case 3: this.tryShiftDown(); 
        }
  
      }); 


  }

  loadScenario(id: number): void {
    this.currentScenario = this.gameService.getScenario(id);

    this.displayTachie = false; // change this
  }

  loadRoom(x: number = Constants.SX, y: number = Constants.SY) {
    this.currentRoom = this.gameService.getRoom(x,y);
  }

  makeChoice(choice: any): void {
    if (this.gameService.checkChoiceRequirements(choice)) {
      this.loadScenario(choice.nextScenarioId);
    }
  }
  restartGame(): void {
    this.loadScenario(0);
  }


  
  image: string = 'https://image.shutterstock.com/image-vector/solar-system-sun-planets-vector-260nw-751091653.jpg'
  coordinates: ImageMapCoordinate[] = [
    {
      name: 'The sun',
      x: 0,
      y: 159,
      width: 95,
      height: 100
    },
    {
      name: 'two',
      x: 100,
      y: 0,
      width: 100,
      height: 100
    }
  ]

  showImage: boolean = false;

  getClick(coordinate: ImageMapCoordinate) {
    console.log(`Clicked on ${coordinate.name}`)
  }


  // listen for keyboard input
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    

    if (true) {
      var key = event.key;
      if (key>='A' && key<='Z')
        key = event.key.toLowerCase();
      //console.log('key to use is ' + key);
      if (key=='n') {
        console.log('keyed n');
      } else if (key=='s') {
        console.log('keyed s');
      } else if (key=='e') {
        console.log('keyed e');
      } else if (key=='w') {
        console.log('keyed w');
      }
        
      else if (event.key=="q") {
        this.otextbox.newMessage('fufu');
      }

      else if (event.key=="ArrowLeft") {
        this.tryShiftLeft();
      } else if (event.key=="ArrowRight") {
        this.tryShiftRight();
      } else if (event.key=="ArrowUp") {
        this.tryShiftUp();
      } else if (event.key=="ArrowDown") {
        this.tryShiftDown();
      }

    }

    

    //var regexp = /^[A-Za-z]/;

      /*
      if (!regexp.exec(key) || key=="Enter" || key=="Shift" || key=="CapsLock" ||
        key=="ArrowLeft" || key=="ArrowRight" || key=="ArrowUp" || key=="ArrowDown" ||
        key=="PageUp" || key=="PageDown" || key=="Escape" || key=="PrintScreen" ||
        key=="Insert" || key=="Delete" || key=="Tab" || key=="Control" || key=="Alt" ||
        key=="Home" || key=="End" || key=="Backspace" || key=="F1" || key=="F2" ||
        key=="F3" || key=="F4" || key=="F5" || key=="F6" || key=="F7" || key=="F8" ||
        key=="F9" || key=="F10" || key=="F11" || key=="F12" || key=="Pause" ||
        key=="NumLock" || key=="ScrollLock" || key=="ContextMenu")  { // only allow alpha characters
        return;
      }
      */

      /*
      if (!event.key || event.key=="Unidentified") { 
        
      }
      event.preventDefault();
      */

    
  }

  tryShiftLeft() {
      if (this.gameService.delta_x > 0 && this.gameService.delta_y > 0  &&
        this.gameService.canGo(this.gameService.player_x, this.gameService.player_y, 0)) {
        this.go(0);
      } else {
        console.log('cannot go 0');
      }  
  }

  tryShiftRight() {
      if (this.gameService.delta_x < Constants.NUM_ROWS-1 && this.gameService.delta_y < Constants.NUM_COLUMNS-1  &&
      this.gameService.canGo(this.gameService.player_x, this.gameService.player_y, 1)) {
        this.go(1);
      } else {
        console.log('cannot go 1');
      }  
  }

  tryShiftUp() {
    if (this.gameService.delta_x < Constants.NUM_ROWS-1 && this.gameService.delta_y > 0 &&
      this.gameService.canGo(this.gameService.player_x, this.gameService.player_y, 2)) {
      this.go(2);
    } else {
      console.log('cannot go 2');
    }   
  }

  tryShiftDown() {
    if (this.gameService.delta_y < Constants.NUM_COLUMNS-1 && this.gameService.delta_x > 0 &&
        this.gameService.canGo(this.gameService.player_x, this.gameService.player_y, 3)) {
      this.go(3);
    } else {
      console.log('cannot go 3');
    }   
  }

  go(dir: number) {
    this.gameService.goPlayer(dir);
    this.gameService.shiftMap(dir);
    this.loadRoom(this.gameService.player_x, this.gameService.player_y);
    console.log(`go ${dir} x=${this.gameService.player_x} y=${this.gameService.player_y} new img_id=${this.currentRoom.img_id}`);
  }

  toggleDisplayMap() {
    this.displayMap = !this.displayMap;
    this.displayMapText = this.displayMap ? "HIDE MAP" : "SHOW MAP";
  }


}
