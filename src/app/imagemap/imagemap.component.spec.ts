import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMapComponent } from './imagemap.component';

describe('ImagemapComponent', () => {
  let component: ImageMapComponent;
  let fixture: ComponentFixture<ImageMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageMapComponent]
    });
    fixture = TestBed.createComponent(ImageMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
