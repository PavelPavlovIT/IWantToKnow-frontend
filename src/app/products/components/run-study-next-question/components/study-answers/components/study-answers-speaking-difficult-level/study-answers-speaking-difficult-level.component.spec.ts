import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAnswersSpeakingDifficultLevelComponent } from './study-answers-speaking-difficult-level.component';

describe('StudyAnswersSpeakingDifficultLevelComponent', () => {
  let component: StudyAnswersSpeakingDifficultLevelComponent;
  let fixture: ComponentFixture<StudyAnswersSpeakingDifficultLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyAnswersSpeakingDifficultLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyAnswersSpeakingDifficultLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
