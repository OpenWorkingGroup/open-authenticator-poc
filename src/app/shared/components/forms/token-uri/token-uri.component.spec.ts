import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TokenUriComponent } from './token-uri.component';

describe('TokenUriComponent', () => {
  let component: TokenUriComponent;
  let fixture: ComponentFixture<TokenUriComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TokenUriComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TokenUriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
