import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAnswersListeningComponent } from './test-answers-listening.component';

describe('TestAnswersListeningComponent', () => {
  let component: TestAnswersListeningComponent;
  let fixture: ComponentFixture<TestAnswersListeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAnswersListeningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAnswersListeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
