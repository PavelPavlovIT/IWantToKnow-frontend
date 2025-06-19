import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTypeTestComponent } from './select-type-test.component';

describe('SelectTypeTestComponent', () => {
  let component: SelectTypeTestComponent;
  let fixture: ComponentFixture<SelectTypeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTypeTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTypeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
