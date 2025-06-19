import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOnlyTitleComponent } from './category-only-title.component';

describe('CategoryOnlyTitleComponent', () => {
  let component: CategoryOnlyTitleComponent;
  let fixture: ComponentFixture<CategoryOnlyTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryOnlyTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryOnlyTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
