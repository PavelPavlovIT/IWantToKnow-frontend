import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProgressDetailsComponent } from './personal-progress-details.component';

describe('PersonalProgressDetailsComponent', () => {
  let component: PersonalProgressDetailsComponent;
  let fixture: ComponentFixture<PersonalProgressDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalProgressDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalProgressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
