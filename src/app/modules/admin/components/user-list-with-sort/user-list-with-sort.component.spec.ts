import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListWithSortComponent } from './user-list-with-sort.component';

describe('UserListWithSortComponent', () => {
  let component: UserListWithSortComponent;
  let fixture: ComponentFixture<UserListWithSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListWithSortComponent]
    });
    fixture = TestBed.createComponent(UserListWithSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
