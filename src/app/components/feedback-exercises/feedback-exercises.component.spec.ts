import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackExercisesComponent } from './feedback-exercises.component';

describe('FeedbackExercisesComponent', () => {
  let component: FeedbackExercisesComponent;
  let fixture: ComponentFixture<FeedbackExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
