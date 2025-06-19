import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAnswersListeningComponent } from './study-answers-listening.component';

describe('StudyAnswersListeningComponent', () => {
  let component: StudyAnswersListeningComponent;
  let fixture: ComponentFixture<StudyAnswersListeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyAnswersListeningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyAnswersListeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
