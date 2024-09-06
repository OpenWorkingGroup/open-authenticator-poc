import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MintTokenComponent } from './mint-token.component';

describe('MintTokenComponent', () => {
  let component: MintTokenComponent;
  let fixture: ComponentFixture<MintTokenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MintTokenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MintTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
