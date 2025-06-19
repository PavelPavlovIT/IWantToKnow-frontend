import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectAnswerDialogComponent } from './correct-answer-dialog.component';

describe('CorrectAnswerDialogComponent', () => {
  let component: CorrectAnswerDialogComponent;
  let fixture: ComponentFixture<CorrectAnswerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectAnswerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorrectAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
