import { TestBed } from '@angular/core/testing';

import { GenerateMapService } from './generate-map.service';

describe('GenerateMapService', () => {
  let service: GenerateMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
