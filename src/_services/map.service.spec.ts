import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';
import { Constants } from 'src/constants';

describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return correct results for the upper left most coordinate of 0,0", () => {
    expect(service.canBe(0,0,-1)).toEqual(true);
    expect(service.canBe(0,0,0)).toEqual(false);
    expect(service.canBe(0,0,2)).toEqual(false);
    expect(service.canBe(0,0,1)).toEqual(true);
    expect(service.canBe(0,0,3)).toEqual(false);
  });

  it("should return correct results for the lower right most coordinate", () => {
    expect(service.canBe(Constants.NUM_ROWS-1,Constants.NUM_COLUMNS-1,-1)).toEqual(true);
    expect(service.canBe(Constants.NUM_ROWS-1,Constants.NUM_COLUMNS-1,0)).toEqual(true);
    expect(service.canBe(Constants.NUM_ROWS-1,Constants.NUM_COLUMNS-1,2)).toEqual(false);
    expect(service.canBe(Constants.NUM_ROWS-1,Constants.NUM_COLUMNS-1,1)).toEqual(false);
    expect(service.canBe(Constants.NUM_ROWS-1,Constants.NUM_COLUMNS-1,3)).toEqual(false);
  });

});
