import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWithExamComponent } from './category-with-exam.component';

describe('CategoryWithExamComponent', () => {
  let component: CategoryWithExamComponent;
  let fixture: ComponentFixture<CategoryWithExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryWithExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryWithExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
