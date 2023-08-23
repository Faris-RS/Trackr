import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFooterComponent } from './user-footer.component';
import { HeaderListComponent } from '../../components/header-list/header-list.component';

describe('UserFooterComponent', () => {
  let component: UserFooterComponent;
  let fixture: ComponentFixture<UserFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFooterComponent, HeaderListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to top when scrollToTop() is called', () => {
    const smoothScrollToSpy = spyOn(component, 'smoothScrollTo');
    component.scrollToTop();
    expect(smoothScrollToSpy).toHaveBeenCalledWith(0, 0);
  });
});
