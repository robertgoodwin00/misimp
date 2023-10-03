
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Room } from 'src/_models.ts';
import { EventEmitterService } from 'src/_services/event-emitter.service';
import { GameService } from 'src/_services/game.service';
import { MapService } from 'src/_services/map.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less'],
    
})
export class MapComponent {

  public grid: Boolean[][] = [];
  public rooms: Room[][] = [];

  public nodes_per_row = Constants.VIEW_WIDTH;
  public dx = this.gameService.delta_x;
  public dy = this.gameService.delta_y;
  ee: Subscription  = new Subscription; 

  constructor(
    private gameService: GameService,
    private eventEmitterService: EventEmitterService,
    private router: Router,
    //private activatedRoute: ActivatedRoute,
    private mapService: MapService,
  ) {
    this.grid = this.mapService.grid;
    this.rooms = this.mapService.rooms;
  }

  ngOnInit() {    
    this.ee = this.eventEmitterService.invokeRefreshMap.subscribe(() => {  
        this.dx = this.gameService.delta_x;
        this.dy = this.gameService.delta_y;
        this.router.navigate([this.router.url]);
        console.log("dx=" + this.dx + ", dy=" + this.dy);
    });  


  }  

  isNode(x: number, y: number) : Boolean {
    x += this.dx; 
    y += this.dy;
    if (x>=0 && y>=0 && x<Constants.NUM_ROWS && y<Constants.NUM_COLUMNS && this.grid[x][y]) {
      //console.log('exits for ' + x + ',' + y + '=' + this.mapService.rooms[x][y].exit.toString());
      return true;
    }
     
    return false;
  }

  canGo(x: number, y: number, dir: number) : Boolean {
    x += this.dx;
    y += this.dy;
    var current = this.grid[x][y];

    return this.mapService.canGo(x,y,dir);

  }

  playerHere(x: number, y: number) : Boolean {
    x += this.dx;
    y += this.dy;
    return (this.gameService.player_x == x && this.gameService.player_y == y) ? true : false;
  }

  circleClick(x: number, y: number) {
    let ax = x + this.dx;
    let ay = y + this.dy;
    console.log(`clicked circle at ${x},${y} (${ax},${ay}) `);
    if (this.mapService.grid[ax][ay]) {
      
      if (this.gameService.player_x==ax && this.gameService.player_y==ay)
        return;

      let dir = -1;
      for (let i=0; i<4; i++) {
        if (this.gameService.player_x-1==ax && this.gameService.player_y-1==ay) {
          dir = 0;
        } else if (this.gameService.player_x+1==ax && this.gameService.player_y+1==ay) {
          dir = 1;
        } else if (this.gameService.player_x+1==ax && this.gameService.player_y-1==ay) {  
          dir = 2;
        } else if (this.gameService.player_x-1==ax && this.gameService.player_y+1==ay) {
          dir = 3;
        }
      }
      
      if (dir!=-1) {
        console.log('try going ' + dir);
        this.eventEmitterService.MovePlayer(dir);
      }
      else {
        var elem = document.getElementById('circle-' + x.toString() + '-' + y.toString()) as SVGAnimateTransformElement | null;
        if (elem) {
          elem.beginElement();
        }
      }
      
        
    }
  }

  circleIdString(x: number, y: number) {
    let s = 'circle-' + x.toString() + '-' + y.toString();
    console.log(s);
    return s;
  }

  hasEvent(x: number, y: number) {
    let ax = x + this.dx;
    let ay = y + this.dy;
    if (this.rooms[ax][ay] && this.rooms[ax][ay].event_available) 
      return true;
    return false;
  }

  getEventPath(x: number, y: number) {
    let ax = x + this.dx;
    let ay = y + this.dy;
    return this.rooms[ax][ay].eventpath(true, true);
  }

}
