
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'image-map',
  templateUrl: './imagemap.component.html',
  styleUrls: ['./imagemap.component.less']
})
export class ImageMapComponent implements OnInit {

  @Input()
  src!: string;

  @Input()
  coordinates!: ImageMapCoordinate[];


  @Output('onClick')
  onClick: EventEmitter<ImageMapCoordinate> = new EventEmitter();

  constructor() { }

  ngOnInit() {  }

  getCoordinateStyle(coordinate: ImageMapCoordinate): object {
    return {
      top: `${coordinate.y}px`,
      left: `${coordinate.x}px`,
      height: `${coordinate.height}px`,
      width: `${coordinate.width}px`
    };
  }

  onAreaClick(coordinate: ImageMapCoordinate | undefined) {
    this.onClick.emit(coordinate);

  }

  // I am not clear on what this is actually doing
  onAreaCreate(x: number, y: number): ImageMapCoordinate {
    const coordinate = new ImageMapCoordinate({x, y, width: 100, height: 100});
    return coordinate;
  }



}

export class ImageMapCoordinate {
  x: number = 0
  y: number = 0
  width: number = 100
  height: number = 100
  name?: string

  constructor(init?: Partial<ImageMapCoordinate>) {
    Object.assign(this, init);
  }
}