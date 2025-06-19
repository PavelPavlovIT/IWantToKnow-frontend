import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAndClockListeningComponent } from './question-and-clock-listening.component';

describe('QuestionAndClockListeningComponent', () => {
  let component: QuestionAndClockListeningComponent;
  let fixture: ComponentFixture<QuestionAndClockListeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAndClockListeningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAndClockListeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
