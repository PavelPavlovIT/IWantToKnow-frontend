import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAndClockReadingComponent } from './question-and-clock-reading.component';

describe('QuestionAndClockReadingComponent', () => {
  let component: QuestionAndClockReadingComponent;
  let fixture: ComponentFixture<QuestionAndClockReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAndClockReadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAndClockReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
