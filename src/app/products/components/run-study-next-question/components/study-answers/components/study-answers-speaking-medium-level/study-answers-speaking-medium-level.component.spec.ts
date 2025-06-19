import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAnswersSpeakingMediumLevelComponent } from './study-answers-speaking-medium-level.component';

describe('StudyAnswersSpeakingMediumLevelComponent', () => {
  let component: StudyAnswersSpeakingMediumLevelComponent;
  let fixture: ComponentFixture<StudyAnswersSpeakingMediumLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyAnswersSpeakingMediumLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyAnswersSpeakingMediumLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
