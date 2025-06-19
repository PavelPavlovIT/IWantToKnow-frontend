import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunStudyByCategoryComponent } from './run-study-by-category.component';

describe('RunStudyByCategoryComponent', () => {
  let component: RunStudyByCategoryComponent;
  let fixture: ComponentFixture<RunStudyByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunStudyByCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunStudyByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
