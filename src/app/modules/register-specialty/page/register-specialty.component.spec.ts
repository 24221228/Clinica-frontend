import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSpecialtyComponent } from './register-specialty.component';

describe('RegisterSpecialtyComponent', () => {
  let component: RegisterSpecialtyComponent;
  let fixture: ComponentFixture<RegisterSpecialtyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterSpecialtyComponent]
    });
    fixture = TestBed.createComponent(RegisterSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
