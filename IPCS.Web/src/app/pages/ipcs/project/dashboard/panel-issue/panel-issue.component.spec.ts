import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelIssueComponent } from './panel-issue.component';

describe('PanelIssueComponent', () => {
  let component: PanelIssueComponent;
  let fixture: ComponentFixture<PanelIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
