import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfilePageComponent } from './user-profile-page.component';
import { UserHeaderComponent } from '../../partials/user-header/user-header.component';
import { UserTimelineComponent } from '../../partials/user-timeline/user-timeline.component';
import { UserFooterComponent } from '../../partials/user-footer/user-footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserProfileComponent } from '../../partials/user-profile/user-profile.component';
import { HeaderListComponent } from '../../components/header-list/header-list.component';

describe('UserProfilePageComponent', () => {
  let component: UserProfilePageComponent;
  let fixture: ComponentFixture<UserProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserProfilePageComponent,
        UserHeaderComponent,
        UserTimelineComponent,
        UserFooterComponent,
        UserProfileComponent,
        HeaderListComponent,
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
