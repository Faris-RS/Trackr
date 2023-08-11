import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent {
  constructor(private toast: HotToastService) {}
  private ngUnsubscribe = new Subject<void>();

  
}
