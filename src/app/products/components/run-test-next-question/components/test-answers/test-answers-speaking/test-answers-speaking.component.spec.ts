import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAnswersSpeakingComponent } from './test-answers-speaking.component';

describe('TestAnswersSpeakingComponent', () => {
  let component: TestAnswersSpeakingComponent;
  let fixture: ComponentFixture<TestAnswersSpeakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAnswersSpeakingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestAnswersSpeakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
