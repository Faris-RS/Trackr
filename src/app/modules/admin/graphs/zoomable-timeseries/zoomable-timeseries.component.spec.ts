import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomableTimeseriesComponent } from './zoomable-timeseries.component';

describe('ZoomableTimeseriesComponent', () => {
  let component: ZoomableTimeseriesComponent;
  let fixture: ComponentFixture<ZoomableTimeseriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoomableTimeseriesComponent]
    });
    fixture = TestBed.createComponent(ZoomableTimeseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
