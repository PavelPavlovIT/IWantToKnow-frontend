import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAndClockSpeakingComponent } from './question-and-clock-speaking.component';

describe('QuestionAndClockSpeakingComponent', () => {
  let component: QuestionAndClockSpeakingComponent;
  let fixture: ComponentFixture<QuestionAndClockSpeakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAndClockSpeakingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAndClockSpeakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
