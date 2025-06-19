import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyQuestionAndClockSpeakingEasyLevelComponent } from './study-question-and-clock-speaking-easy-level.component';

describe('StudyQuestionAndClockSpeakingEasyLevelComponent', () => {
  let component: StudyQuestionAndClockSpeakingEasyLevelComponent;
  let fixture: ComponentFixture<StudyQuestionAndClockSpeakingEasyLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyQuestionAndClockSpeakingEasyLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyQuestionAndClockSpeakingEasyLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
