import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyQuestionAndClockSpeakingMediumLevelComponent } from './study-question-and-clock-speaking-medium-level.component';

describe('StudyQuestionAndClockSpeakingMediumLevelComponent', () => {
  let component: StudyQuestionAndClockSpeakingMediumLevelComponent;
  let fixture: ComponentFixture<StudyQuestionAndClockSpeakingMediumLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyQuestionAndClockSpeakingMediumLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyQuestionAndClockSpeakingMediumLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
