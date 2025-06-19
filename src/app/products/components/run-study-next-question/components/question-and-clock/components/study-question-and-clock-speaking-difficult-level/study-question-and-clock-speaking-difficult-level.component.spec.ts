import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyQuestionAndClockSpeakingDifficultLevelComponent } from './study-question-and-clock-speaking-difficult-level.component';

describe('StudyQuestionAndClockSpeakingDifficultLevelComponent', () => {
  let component: StudyQuestionAndClockSpeakingDifficultLevelComponent;
  let fixture: ComponentFixture<StudyQuestionAndClockSpeakingDifficultLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyQuestionAndClockSpeakingDifficultLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyQuestionAndClockSpeakingDifficultLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
