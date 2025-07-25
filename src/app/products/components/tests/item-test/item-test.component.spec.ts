import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTestComponent } from './item-test.component';

describe('ItemTestComponent', () => {
  let component: ItemTestComponent;
  let fixture: ComponentFixture<ItemTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
