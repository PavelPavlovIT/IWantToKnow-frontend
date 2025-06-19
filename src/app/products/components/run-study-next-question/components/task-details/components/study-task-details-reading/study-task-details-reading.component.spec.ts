import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTaskDetailsReadingComponent } from './study-task-details-reading.component';

describe('StudyTaskDetailsReadingComponent', () => {
  let component: StudyTaskDetailsReadingComponent;
  let fixture: ComponentFixture<StudyTaskDetailsReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyTaskDetailsReadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyTaskDetailsReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
