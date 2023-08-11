import { Component } from '@angular/core';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css'],
})
export class AddVehicleComponent {
  carName: string = '';
  vehicleYear: string = '';
  insuranceExpiry!: Date;

  onSubmit(): void {
    console.log(this.carName);
    console.log(this.vehicleYear);
    console.log(this.insuranceExpiry);
    
  }
}
