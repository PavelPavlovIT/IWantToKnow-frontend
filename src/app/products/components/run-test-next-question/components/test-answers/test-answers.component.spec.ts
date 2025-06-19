import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAnswersComponent } from './test-answers.component';

describe('TestAnswersComponent', () => {
  let component: TestAnswersComponent;
  let fixture: ComponentFixture<TestAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAnswersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
