import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodScreenComponent } from './mood-screen.component';

describe('MoodScreenComponent', () => {
  let component: MoodScreenComponent;
  let fixture: ComponentFixture<MoodScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoodScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
