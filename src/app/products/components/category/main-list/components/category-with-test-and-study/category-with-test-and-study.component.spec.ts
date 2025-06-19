import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWithTestAndStudyComponent } from './category-with-test-and-study.component';

describe('CategoryWithTestAndStudyComponent', () => {
  let component: CategoryWithTestAndStudyComponent;
  let fixture: ComponentFixture<CategoryWithTestAndStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryWithTestAndStudyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryWithTestAndStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
