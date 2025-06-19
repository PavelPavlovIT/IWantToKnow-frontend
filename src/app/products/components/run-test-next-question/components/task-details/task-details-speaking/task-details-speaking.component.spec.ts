import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsSpeakingComponent } from './task-details-speaking.component';

describe('TaskDetailsSpeakingComponent', () => {
  let component: TaskDetailsSpeakingComponent;
  let fixture: ComponentFixture<TaskDetailsSpeakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailsSpeakingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailsSpeakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
