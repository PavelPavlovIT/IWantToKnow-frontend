import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyTaskDetailsListeningComponent } from './study-task-details-listening.component';

describe('StudyTaskDetailsListeningComponent', () => {
  let component: StudyTaskDetailsListeningComponent;
  let fixture: ComponentFixture<StudyTaskDetailsListeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyTaskDetailsListeningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyTaskDetailsListeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
