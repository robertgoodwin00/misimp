import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  movePlayer = new EventEmitter<number>();    
  invokeRefreshMap = new EventEmitter();
  invokeAddCardToHand = new EventEmitter();
  invokeRemoveCardFromHand = new EventEmitter();
    
  constructor() { }    
    
  MovePlayer(dir: number) {    
    this.movePlayer.emit(dir);   
  }  
    
  RefreshMap() {
    this.invokeRefreshMap.emit();
  }

  AddCardToHand(cardid: number) {
    this.invokeAddCardToHand.emit(cardid);
  }

  RemoveCardFromHand(cardid: number) {
    this.invokeRemoveCardFromHand.emit(cardid);
  }
  

}
