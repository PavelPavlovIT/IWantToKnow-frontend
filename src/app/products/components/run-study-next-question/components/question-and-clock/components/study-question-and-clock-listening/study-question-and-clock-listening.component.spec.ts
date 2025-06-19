import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyQuestionAndClockListeningComponent } from './study-question-and-clock-listening.component';

describe('StudyQuestionAndClockListeningComponent', () => {
  let component: StudyQuestionAndClockListeningComponent;
  let fixture: ComponentFixture<StudyQuestionAndClockListeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyQuestionAndClockListeningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyQuestionAndClockListeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
