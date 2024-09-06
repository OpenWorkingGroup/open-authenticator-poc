import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PasteButtonComponent } from './paste-button.component';

describe('PasteButtonComponent', () => {
  let component: PasteButtonComponent;
  let fixture: ComponentFixture<PasteButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PasteButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
