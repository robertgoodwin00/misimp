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
  public delta_x: number = 2; 
  public delta_y: number = 2; 
  // player is where the player is
  public player_x: number = this.delta_x + 2;
  public player_y: number = this.delta_y + 2;


  constructor(
    private eventEmitterService: EventEmitterService, 
    private generateMapService: GenerateMapService,
    private mapService: MapService,
  ) {
      this.generateMapService.generate();  // generate the entire map and store in mapService.grid
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

  canGo(x: number = this.player_x, y: number = this.player_y, dir: number = -1) {
    return this.mapService.canGo(x,y,dir);
  }

  goPlayer(dir: number) {
    switch(dir) {
      case 0: this.player_x -= 1; this.player_y -= 1; break;
      case 1: this.player_x += 1; this.player_y += 1; break;
      case 2: this.player_x += 1; this.player_y -= 1; break;
      case 3: this.player_x -= 1; this.player_y += 1;
    }
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
}

