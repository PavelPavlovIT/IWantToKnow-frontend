import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAndClockComponent } from './question-and-clock.component';

describe('QuestionAndClockComponent', () => {
  let component: QuestionAndClockComponent;
  let fixture: ComponentFixture<QuestionAndClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAndClockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAndClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
