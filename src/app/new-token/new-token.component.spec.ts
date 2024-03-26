import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewTokenComponent } from './new-token.component';

describe('NewTokenComponent', () => {
  let component: NewTokenComponent;
  let fixture: ComponentFixture<NewTokenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NewTokenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
