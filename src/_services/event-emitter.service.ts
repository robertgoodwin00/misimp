import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  movePlayer = new EventEmitter<number>();    
  invokeRefreshMap = new EventEmitter();
    
  constructor() { }    
    
  MovePlayer(dir: number) {    
    this.movePlayer.emit(dir);   
  }  
    
  RefreshMap() {
    this.invokeRefreshMap.emit();
  }
  

}
