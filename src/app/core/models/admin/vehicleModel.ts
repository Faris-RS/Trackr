export interface VehicleModel {
  id?: number;
  vehicleName: string;
  vehicleYear: number;
  insuranceExpiry: Date;
  registrationNumber: string;
  rented?: boolean;
  rentedDate?: Date;
  returnDate?: Date;
  rentedBy?: string;
}
