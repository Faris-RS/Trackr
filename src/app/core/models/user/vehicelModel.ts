export interface VehicleModel {
  id?: number;
  vehicleName: string;
  rent: number;
  registrationNumber: string;
}

export interface RentedModel {
  id?: number;
  vehicleName: string;
  rate: number;
  registrationNumber: string;
  rentedDate: Date;
  returnDate: Date;
}
