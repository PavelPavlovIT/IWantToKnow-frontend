import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHierarchyOfCategoriesComponent } from './header-hierarchy-of-categories.component';

describe('HeaderHierarchyOfCategoriesComponent', () => {
  let component: HeaderHierarchyOfCategoriesComponent;
  let fixture: ComponentFixture<HeaderHierarchyOfCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderHierarchyOfCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderHierarchyOfCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
