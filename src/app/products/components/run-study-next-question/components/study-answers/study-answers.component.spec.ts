import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAnswersComponent } from './study-answers.component';

describe('StudyAnswersComponent', () => {
  let component: StudyAnswersComponent;
  let fixture: ComponentFixture<StudyAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyAnswersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
