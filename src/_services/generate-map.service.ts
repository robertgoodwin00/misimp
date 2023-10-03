import { Injectable } from '@angular/core';
import {Constants} from '../constants';
import { MapService } from './map.service';
import { Room } from 'src/_models.ts';



@Injectable({
  providedIn: 'root'
})
export class GenerateMapService {

  quota: number = 0;
  rooms: Room[][] = [];

  // mark which events have been assigned to rooms so that we don't repeat
  used_1s: Boolean[] = [];
  used_2s: Boolean[] = [];
  used_3s: Boolean[] = [];

  constructor(
    private mapService: MapService
  ) { }

  nodable(x: number, y: number) {
    return (x + y) % 2 == 0 ? true : false;
  }

  generate() {
    this.quota = Constants.QUOTA;
    // keep trying to generate a map until we generate one with quota met
    while (this.quota > 0) {
      this.quota = Constants.QUOTA;
      console.log(`GENERATING MAP with quota=${this.quota}`);
      this.generateMap();

      //this.quota = 0;
    }

    // generate details of the rooms
    this.generateRooms();
  }

  generateMap() {
    let rows = Constants.NUM_ROWS;
    let columns = Constants.NUM_COLUMNS;
    let grid = new Array(rows);
    let rooms = new Array(rows);

    this.used_1s = new Array(Constants.NUM_1s).fill(false);
    this.used_2s = new Array(Constants.NUM_2s).fill(false);
    let used_3s = new Array(Constants.NUM_3s).fill(false);

    // initialize first
    for (let i=0; i < rows; i++) {
      grid[i] = [];
      rooms[i] = [];
      for (let j=0; j < columns; j++) {
        grid[i][j] = false; // initialize
        rooms[i][j] = null;
      }
    }
    this.mapService.rooms = rooms;

    let sx = Constants.SX;
    let sy = Constants.SY;
    console.log('sx= ' + sx + ' and sy= ' + sy);
    grid[sx][sy] = true;
    console.log(`making starting room at ${sx},${sy}`);
    this.mapService.rooms[sx][sy] = new Room(sx,sy);
    // adjoining four squares all have nodes
    /*grid[sx-1][sy-1] = true
    grid[sx+1][sy+1] = true;
    grid[sx+1][sy-1] = true;
    grid[sx-1][sy+1] = true;*/

    let x = sx;
    let y = sy;
    

    let s: { [key: string]: number } = {x: sx, y: sy}
    let array_to_pave = [s];
    let iterations = 0;
    
    while (array_to_pave.length > 0) {
      iterations += 1;

      let square = array_to_pave.shift()!;
      let px = square['x'];
      let py = square['y'];
      console.log('look at square x=' + px.toString() + ' y=' + py.toString());

      // make a room there
      

      for (let dir=0; dir<4; dir++) {
        
        if (!this.canPave(px,py,dir))
          continue;

        let paveit = false;
        if (px==Constants.SX && py==Constants.SY) {
          // 100% on first iteration
          paveit = true;
        } else if (iterations<2) {
          // 50% chance on second iteration
          paveit = (Math.floor(this.mapService.random()*2))==0;
        } else {
          // on any but the first iteration we have a 33% chance to pave
          paveit = (Math.floor(this.mapService.random()*3))==0;
        }
        

        let adjacent = this.mapService.adjacentRoom(px,py,dir) || null;
        if (paveit || 
          (adjacent && adjacent.exit[this.mapService.oppositeDir(dir)])) {

          let nx = 0;
          let ny = 0;
          switch(dir) {
            case 0: nx=px-1; ny=py-1; break;
            case 1: nx=px+1; ny=py+1; break;
            case 2: nx=px+1; ny=py-1; break;
            case 3: nx=px-1; ny=py+1; 
          }

          if (iterations<10)
            console.log('pave in dir ' + dir);
          this.mapService.rooms[px][py].setExit(dir);
          //console.log(`exits at ${px},${py} are ${this.mapService.rooms[px][py].exit.toString()}`);

          //console.log(`nx=${nx} ny=${ny}`);
          
          if (!grid[nx][ny]) {
            grid[nx][ny] = true;
            // if there's no room there we will be making one
            if (iterations<10)
              console.log(`making room at ${nx},${ny}`);
            this.mapService.rooms[nx][ny] = new Room(nx,ny);

            let np: {[key:string]: number} = {x:nx, y:ny};
            if (!array_to_pave.includes(np)) {
              //console.log(`push ${nx},${ny} to array`);
              array_to_pave.push(np);
            }
          } else {
            // room already exists there so set exit for it
            //console.log('set exit for opposite dir of ' + dir);
            this.mapService.rooms[nx][ny].setExit(this.mapService.oppositeDir(dir));
            //console.log(`exits at ${nx},${ny} are ${this.mapService.rooms[nx][ny].exit.toString()}`);
          }
          
        } 

        
       

      } // end for each direction

      

      this.quota -= 1;

    }
    console.log(`finished while loop with quota=${this.quota}`);

    
    this.mapService.grid = grid;
    
  }

  canPave(x: number, y: number, dir: number) : Boolean {
    if (this.mapService.canBe(x,y,dir))
      return true;
    return false;

  }

  generateRooms() {
    let rows = Constants.NUM_ROWS;
    let columns = Constants.NUM_COLUMNS;

    for (let i=0; i < rows; i++) {
      for (let j=0; j < columns; j++) {
        if (this.mapService.grid[i][j]) {
          let room = this.mapService.rooms[i][j];
          if (!room) 
            console.log('error: nonexistent room at ' + i + ',' + j);

          // set title
          let title = Math.floor(this.mapService.random()*2)==0 ? 'one room' : 'another room';
          this.mapService.rooms[i][j].title = title;

          // set image
          let img_id = Math.floor(this.mapService.random()*8);
          //console.log('room=' + img_id.toString());
          this.mapService.rooms[i][j].img_id = img_id.toString();
          
          // set category and event image
          let cat = 1;
          let event_id = 0;
          let found = false;
          // how many tries it is taking to find an unused event
          let tries = (Math.floor(this.mapService.random()*2)==0) ? 0 : 100; 

          while (!found && tries<100) {
            
            if (Math.floor(this.mapService.random()*2)==0) {
              cat = 1;
              event_id = Math.floor(this.mapService.random()*Constants.NUM_1s);
              if (this.used_1s[event_id] == false) {
                this.used_1s[event_id] = true;
                found = true;
              }
            } else if (Math.floor(this.mapService.random()*4)>0) {
              cat = 2;
              event_id = Math.floor(this.mapService.random()*Constants.NUM_2s);
              if (this.used_2s[event_id] == false) {
                this.used_2s[event_id] = true;
                found = true;
              }
            } else {
              cat = 3;
              event_id = Math.floor(this.mapService.random()*Constants.NUM_3s);
              if (this.used_3s[event_id] == false) {
                this.used_3s[event_id] = true;
                found = true;
              }
            }

            tries += 1;

          } // end while
          
          if (found) {
            this.mapService.rooms[i][j].setEvent(event_id, cat);
            //console.log('set cat=' + cat + ' and event=' + event_id);
          } else {
            
            //console.log('not event set for room');
          }
          
       }
        
      }
    }

    
  }



}
