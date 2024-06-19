import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewAccountComponent } from './create.component';

describe('NewAccountComponent', () => {
  let component: NewAccountComponent;
  let fixture: ComponentFixture<NewAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NewAccountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
