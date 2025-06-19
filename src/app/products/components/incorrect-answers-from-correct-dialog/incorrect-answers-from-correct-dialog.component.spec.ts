import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectAnswersFromCorrectDialogComponent } from './incorrect-answers-from-correct-dialog.component';

describe('IncorrectAnswersFromCorrectDialogComponent', () => {
  let component: IncorrectAnswersFromCorrectDialogComponent;
  let fixture: ComponentFixture<IncorrectAnswersFromCorrectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncorrectAnswersFromCorrectDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncorrectAnswersFromCorrectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
