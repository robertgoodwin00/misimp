import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PlayerStats, Choices, RequiredStats, Scenario } from 'src/_models.ts';
import { EventEmitterService } from './event-emitter.service';
import { GenerateMapService } from './generate-map.service';
import {Constants} from '../constants';
import {MapService} from './map.service';



@Injectable({
  providedIn: 'root',
})
export class GameService {



  

  /*private playerStats: { [key: string]: number } = {
    intelligence: 1,
    charisma: 1,
    strength: 1,
  };*/

  private playerStats = new PlayerStats(0,0,0);


  //private rs = new RequiredStats('charisma',4);
  //private cA = new Choices('Choice A', 'scenarioA');
  //private cB = new Choices('Choice B', 'scenarioB');
  private s0 = new Scenario(0,'Starting Point', 
    'This is the starting point of the game.',
    [new Choices('Choice 1', 1),new Choices('Choice 2', 2)]);
  private s1 = new Scenario(1,'Scenario 1', 'You have chosen path 1.',[new Choices('Go to Scenario 3', 3),new Choices('Go to Scenario 4', 4)]);
  private s2 = new Scenario(2,'Scenario 2', 'You have chosen path 2.',[new Choices('Go to Scenario 3', 3),new Choices('Go to Scenario 5', 5)]);
  private s3 = new Scenario(3,'Scenario 3', 'You have reached path 3.',[new Choices('Go to Scenario 6', 6)]);
  private s4 = new Scenario(4,'Scenario 4', 'You have reached path 4.',[new Choices('Go to Scenario 6', 6)]);
  private s5 = new Scenario(5,'Scenario 5', 'You have reached path 5.',[new Choices('Go to Scenario 6', 6)]);
  private s6 = new Scenario(6,'The End', 'End of the game!',[]);

  private scenarios: Scenario[] = [this.s0,this.s1,this.s2,this.s3,this.s4,this.s5,this.s6];


  // delta is offset from leftmost rightmost corner (0,0)
  public delta_x: number = Constants.SX - Constants.DISPLACEMENT; 
  public delta_y: number = Constants.SX - Constants.DISPLACEMENT; 
  // player is where the player is
  public player_x: number = Constants.SX;
  public player_y: number = Constants.SY;

  public player_walk: number = Constants.STARTING_WALK;
  public player_meet: number = Constants.STARTING_MEET;
  public player_money: number = 1000;
  public player_stats: number[] = [3,3,3,3];  // looks, humor, mystery, romance
  public player_score: number = 0;
  public player_level: number = 0;
  


  constructor(
    private eventEmitterService: EventEmitterService, 
    private generateMapService: GenerateMapService,
    private mapService: MapService,
  ) {
      this.generateMapService.generate();  // generate the entire map and store in mapService.grid

      this.mapService.rooms[this.player_x][this.player_y].turnOffEvent();
  }


  

  // shift the visible map
  shiftMap(dir: number) {
    console.log('shift ' + dir.toString());
    switch(dir) {
      case 0: this.delta_x -= 1; this.delta_y -= 1; break;
      case 1: this.delta_x += 1; this.delta_y += 1; break;
      case 2: this.delta_x += 1; this.delta_y -= 1; break;
      case 3: this.delta_x -= 1; this.delta_y += 1;
    }

    this.eventEmitterService.RefreshMap();
    /*
    return Observable.create((observer: { next: () => void; }) => {
      
          observer.next();
     
    });*/
  }

  canGo(x: number = this.player_x, y: number = this.player_y, dir: number = -1) : Boolean {
    if (this.mapService.canGo(x,y,dir)) {
      if (this.player_walk<=0) {
        console.log('out of player walk');
        return false;
      }

      let room = this.mapService.adjacentRoom(x,y,dir);
      if (room?.event_available && this.player_meet<=0) {
        console.log('out of player meet');
        return false;
      }

      return true;
    }
    return false;
  }

  goPlayer(dir: number) {
    switch(dir) {
      case 0: this.player_x -= 1; this.player_y -= 1; break;
      case 1: this.player_x += 1; this.player_y += 1; break;
      case 2: this.player_x += 1; this.player_y -= 1; break;
      case 3: this.player_x -= 1; this.player_y += 1;
    }

    this.player_walk -= 1;

    let room = this.getRoom(this.player_x,this.player_y);
    if (room.event_available)
      this.player_meet -= 3;
    
  }


  setPlayerStats(stats: {
    intelligence: number;
    charisma: number;
    strength: number;
  }): void {
    this.playerStats = stats;
  }

  getScenario(id: number) {
    return this.scenarios[id];
  }

  getRoom(x: number, y: number) {
    return this.mapService.rooms[x][y];
  }

  checkChoiceRequirements(choice: any): boolean {
    //for (const [stat, requiredValue] of Object.entries(choice.requiredStats)) {
      //if (this.playerStats[stat] < requiredValue) {
      /*if (this.playerStats.stat < requiredValue) {
        return false;
      }*/
    //}
    return true;
  }

  turnOffEvent() {
    this.mapService.rooms[this.player_x][this.player_y].turnOffEvent();
  }

  persuade() {
    if (true) {
      let current_room = this.mapService.rooms[this.player_x][this.player_y];
      let score_change = current_room.cat;
      this.player_score += score_change;
    }
  }
}

