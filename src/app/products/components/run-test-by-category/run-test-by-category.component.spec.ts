import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunTestByCategoryComponent } from './run-test-by-category.component';

describe('RunTestByCategoryComponent', () => {
  let component: RunTestByCategoryComponent;
  let fixture: ComponentFixture<RunTestByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunTestByCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunTestByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
