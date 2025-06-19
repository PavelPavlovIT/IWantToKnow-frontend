import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAnswersReadingComponent } from './test-answers-reading.component';

describe('TestAnswersReadingComponent', () => {
  let component: TestAnswersReadingComponent;
  let fixture: ComponentFixture<TestAnswersReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAnswersReadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAnswersReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
