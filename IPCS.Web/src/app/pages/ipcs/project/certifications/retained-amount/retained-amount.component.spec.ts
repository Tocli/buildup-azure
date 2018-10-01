import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetainedAmountComponent } from './retained-amount.component';

describe('RetainedAmountComponent', () => {
  let component: RetainedAmountComponent;
  let fixture: ComponentFixture<RetainedAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetainedAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetainedAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
