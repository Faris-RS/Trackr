import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderListComponent } from './header-list.component';

describe('HeaderListComponent', () => {
  let component: HeaderListComponent;
  let fixture: ComponentFixture<HeaderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderListComponent],
    });
    fixture = TestBed.createComponent(HeaderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
