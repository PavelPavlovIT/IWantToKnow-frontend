import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyQuestionAndClockReadingComponent } from './study-question-and-clock-reading.component';

describe('StudyQuestionAndClockReadingComponent', () => {
  let component: StudyQuestionAndClockReadingComponent;
  let fixture: ComponentFixture<StudyQuestionAndClockReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyQuestionAndClockReadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyQuestionAndClockReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
