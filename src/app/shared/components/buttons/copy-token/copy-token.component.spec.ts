import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CopyTokenComponent } from './copy-token.component';

describe('CopyButtonComponent', () => {
  let component: CopyTokenComponent;
  let fixture: ComponentFixture<CopyTokenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CopyTokenComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CopyTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
