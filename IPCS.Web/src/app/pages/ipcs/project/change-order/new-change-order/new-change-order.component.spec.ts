import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChangeOrderComponent } from './new-change-order.component';

describe('NewChangeOrderComponent', () => {
  let component: NewChangeOrderComponent;
  let fixture: ComponentFixture<NewChangeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChangeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChangeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
