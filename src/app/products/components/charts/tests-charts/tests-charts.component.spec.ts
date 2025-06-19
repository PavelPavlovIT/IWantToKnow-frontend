import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsChartsComponent } from './tests-charts.component';

describe('TestsChartsComponent', () => {
  let component: TestsChartsComponent;
  let fixture: ComponentFixture<TestsChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestsChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
