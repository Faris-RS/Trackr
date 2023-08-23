import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundComponent } from './background.component';

describe('BackgroundComponent', () => {
  let component: BackgroundComponent;
  let fixture: ComponentFixture<BackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render background image correctly', () => {
    const backgroundImageEl = fixture.nativeElement.querySelector('.bg-cover');
    expect(backgroundImageEl.style.backgroundImage).toContain(
      'https://images.unsplash.com/photo-1637004801211-d6c44476c641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    );
  });
});
