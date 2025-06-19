import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsReadingComponent } from './task-details-reading.component';

describe('TaskDetailsReadingComponent', () => {
  let component: TaskDetailsReadingComponent;
  let fixture: ComponentFixture<TaskDetailsReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDetailsReadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailsReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
