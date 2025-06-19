import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProgressComponent } from './personal-progress.component';

describe('PersonalProgressComponent', () => {
  let component: PersonalProgressComponent;
  let fixture: ComponentFixture<PersonalProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
