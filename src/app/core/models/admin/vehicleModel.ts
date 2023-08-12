export interface VehicleModel {
  id?: number;
  vehicleName: string;
  vehicleYear: number;
  insuranceExpiry: Date;
  registrationNumber: string;
  rate: number
  rented?: boolean;
  rentedDate?: Date;
  returnDate?: Date;
  rentedBy?: string;
}
