import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUserDataComponent } from './set-user-data.component';

describe('SetUserDataComponent', () => {
  let component: SetUserDataComponent;
  let fixture: ComponentFixture<SetUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetUserDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
