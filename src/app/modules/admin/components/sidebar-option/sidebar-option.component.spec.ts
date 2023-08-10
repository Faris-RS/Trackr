import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarOptionComponent } from './sidebar-option.component';

describe('SidebarOptionComponent', () => {
  let component: SidebarOptionComponent;
  let fixture: ComponentFixture<SidebarOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarOptionComponent],
    });
    fixture = TestBed.createComponent(SidebarOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
