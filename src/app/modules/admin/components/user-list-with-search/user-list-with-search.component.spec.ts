import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListWithSearchComponent } from './user-list-with-search.component';

describe('UserListWithSearchComponent', () => {
  let component: UserListWithSearchComponent;
  let fixture: ComponentFixture<UserListWithSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListWithSearchComponent]
    });
    fixture = TestBed.createComponent(UserListWithSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
