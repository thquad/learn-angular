import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsPageComponent } from './signals-page.component';
import { MatButton } from '@angular/material/button';

describe('SignalsPageComponent', () => {
  let component: SignalsPageComponent;
  let fixture: ComponentFixture<SignalsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignalsPageComponent,
        MatButton
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
