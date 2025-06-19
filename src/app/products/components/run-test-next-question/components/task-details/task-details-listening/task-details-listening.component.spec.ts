import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsListeningComponent } from './task-details-listening.component';

describe('TaskDetailsListeningComponent', () => {
  let component: TaskDetailsListeningComponent;
  let fixture: ComponentFixture<TaskDetailsListeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailsListeningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailsListeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
