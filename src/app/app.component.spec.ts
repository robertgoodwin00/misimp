import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { MapComponent } from './map/map.component';
import { TextboxComponent } from './textbox/textbox.component';
import { ImageMapComponent } from './imagemap/imagemap.component';


describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],

    declarations: [AppComponent, GameComponent, MapComponent, TextboxComponent, ImageMapComponent]
  }));

  it('should create game app', () => {
    const fixture = TestBed.createComponent(GameComponent);
    const game = fixture.componentInstance;
    expect(game).toBeTruthy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'misimp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('misimp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content h3')?.textContent).toContain('game under construction');
  });
});
