import { Injectable } from '@angular/core';
import { Constants } from 'src/constants';
import { Room } from 'src/_models.ts';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public grid: Boolean[][] = [];
  public rooms: Room[][] = [];

  constructor() { }

  /*random = function(s: number) {
    return function() {
        s = Math.sin(s) * 10000; return s - Math.floor(s);
    };
  };*/

  random() {
      var x = Math.sin(Constants.seed_use++) * 10000;
      return x - Math.floor(x);
  }


  oppositeDir(dir: number) {
    switch(dir) {
      case 0: return 1;
      case 1: return 0;
      case 2: return 3;
      case 3: return 2;
    }
    return -1;
  }

  // dir of -1 means see if the square coordiantes can exist
  // dir of 0-3 means an adjacent square coordinates
  canBe(x: number, y: number, dir: number = -1) : Boolean {

    switch(dir) {
      case 0: 
        return  (x-1>=2 && y-1>=2) ? true : false;
      case 1: 
        return (x+1<Constants.NUM_ROWS-2 && y+1<Constants.NUM_COLUMNS-2) ? true : false;
      case 2:
        return (y-1>=2 && x+1<Constants.NUM_ROWS-2) ? true : false;
      case 3:
        return (y+1<Constants.NUM_COLUMNS-2 && x-1>=2) ? true : false;
      case -1:
        return (x>=2 && y>=2 && x<Constants.NUM_ROWS-2 && y<Constants.NUM_COLUMNS-2) ? true : false;
    }
    return false;
  }

  canGo(x: number, y: number, dir: number = -1) : Boolean {
    // first see if that square exists
    if (!this.canBe(x,y,dir))
      return false;

    // see if there is a node on that square and an exit
    switch(dir) {
      case 0: 
        return  (this.grid[x-1][y-1] && this.rooms[x][y].exit[dir]) ? true : false;
      case 1: 
        return (this.grid[x+1][y+1] && this.rooms[x][y].exit[dir]) ? true : false;
      case 2:
        return (this.grid[x+1][y-1] && this.rooms[x][y].exit[dir]) ? true : false;
      case 3:
        return (this.grid[x-1][y+1] && this.rooms[x][y].exit[dir]) ? true : false;
    }
    return false;

  }

  
  adjacentRoom(x: number, y: number, dir: number) {
    if (!this.canBe(x,y,dir))
      return null;

    switch(dir) {
      case 0: return this.rooms[x-1][y-1];
      case 1: return this.rooms[x+1][y+1];
      case 2: return this.rooms[x+1][y-1];
      case 3: return this.rooms[x-1][y+1];
        
    }
    return null;
  }

}
