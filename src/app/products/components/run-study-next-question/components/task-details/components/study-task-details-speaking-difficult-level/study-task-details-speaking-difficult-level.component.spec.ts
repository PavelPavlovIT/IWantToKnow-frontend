import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTaskDetailsSpeakingDifficultLevelComponent } from './study-task-details-speaking-difficult-level.component';

describe('StudyTaskDetailsSpeakingDifficultLevelComponent', () => {
  let component: StudyTaskDetailsSpeakingDifficultLevelComponent;
  let fixture: ComponentFixture<StudyTaskDetailsSpeakingDifficultLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyTaskDetailsSpeakingDifficultLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyTaskDetailsSpeakingDifficultLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
