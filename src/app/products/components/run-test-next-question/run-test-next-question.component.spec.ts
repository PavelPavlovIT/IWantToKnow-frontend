import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunTestNextQuestionComponent } from './run-test-next-question.component';

describe('RunTestNextQuestionComponent', () => {
  let component: RunTestNextQuestionComponent;
  let fixture: ComponentFixture<RunTestNextQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunTestNextQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunTestNextQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
