import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserHeaderComponent } from './user-header.component';
import { Router } from '@angular/router';
import { HeaderListComponent } from '../../components/header-list/header-list.component'; // Import the correct component path

describe('UserHeaderComponent', () => {
  let component: UserHeaderComponent;
  let fixture: ComponentFixture<UserHeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserHeaderComponent, HeaderListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout method and navigate to /user/login', () => {
    const removeItemSpy = spyOn(localStorage, 'removeItem');
    const routerNavigateSpy = spyOn(router, 'navigate');

    component.logout();

    expect(removeItemSpy).toHaveBeenCalledWith('userToken');
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/user/login']);
  });
});
