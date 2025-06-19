import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunStudyNextQuestionComponent } from './run-study-next-question.component';

describe('RunStudyNextQuestionComponent', () => {
  let component: RunStudyNextQuestionComponent;
  let fixture: ComponentFixture<RunStudyNextQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunStudyNextQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunStudyNextQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
