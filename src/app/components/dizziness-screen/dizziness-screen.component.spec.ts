import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DizzinessScreenComponent } from './dizziness-screen.component';

describe('DizzinessScreenComponent', () => {
  let component: DizzinessScreenComponent;
  let fixture: ComponentFixture<DizzinessScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DizzinessScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DizzinessScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
