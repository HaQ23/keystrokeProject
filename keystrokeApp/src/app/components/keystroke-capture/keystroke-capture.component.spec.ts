import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeystrokeCaptureComponent } from './keystroke-capture.component';

describe('KeystrokeCaptureComponent', () => {
  let component: KeystrokeCaptureComponent;
  let fixture: ComponentFixture<KeystrokeCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeystrokeCaptureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeystrokeCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
