import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTaskDetailsSpeakingMediumLevelComponent } from './study-task-details-speaking-medium-level.component';

describe('StudyTaskDetailsSpeakingMediumLevelComponent', () => {
  let component: StudyTaskDetailsSpeakingMediumLevelComponent;
  let fixture: ComponentFixture<StudyTaskDetailsSpeakingMediumLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyTaskDetailsSpeakingMediumLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyTaskDetailsSpeakingMediumLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
