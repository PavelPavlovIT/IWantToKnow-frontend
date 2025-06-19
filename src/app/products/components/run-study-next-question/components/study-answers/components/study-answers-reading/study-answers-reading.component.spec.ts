import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAnswersReadingComponent } from './study-answers-reading.component';

describe('StudyAnswersReadingComponent', () => {
  let component: StudyAnswersReadingComponent;
  let fixture: ComponentFixture<StudyAnswersReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyAnswersReadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyAnswersReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
