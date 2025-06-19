import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAnswersSpeakingEasyLevelComponent } from './study-answers-speaking-easy-level.component';

describe('StudyAnswersSpeakingEasyLevelComponent', () => {
  let component: StudyAnswersSpeakingEasyLevelComponent;
  let fixture: ComponentFixture<StudyAnswersSpeakingEasyLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyAnswersSpeakingEasyLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyAnswersSpeakingEasyLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
