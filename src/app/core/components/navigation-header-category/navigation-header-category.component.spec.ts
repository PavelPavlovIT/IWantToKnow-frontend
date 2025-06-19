import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationHeaderCategoryComponent } from './navigation-header-category.component';

describe('NavigationHeaderCategoryComponent', () => {
  let component: NavigationHeaderCategoryComponent;
  let fixture: ComponentFixture<NavigationHeaderCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationHeaderCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationHeaderCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
