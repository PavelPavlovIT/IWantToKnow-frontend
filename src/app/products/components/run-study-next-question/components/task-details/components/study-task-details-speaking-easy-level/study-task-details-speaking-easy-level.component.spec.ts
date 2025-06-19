import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTaskDetailsSpeakingEasyLevelComponent } from './study-task-details-speaking-easy-level.component';

describe('StudyTaskDetailsSpeakingEasyLevelComponent', () => {
  let component: StudyTaskDetailsSpeakingEasyLevelComponent;
  let fixture: ComponentFixture<StudyTaskDetailsSpeakingEasyLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyTaskDetailsSpeakingEasyLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyTaskDetailsSpeakingEasyLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
