export interface VehicleModel {
  id?: number;
  vehicleName: string;
  rent: number;
  registrationNumber: string;
  image: string;
}

export interface RentedModel {
  id?: number;
  vehicleName: string;
  rate: number;
  registrationNumber: string;
  rentedDate: Date;
  returnDate: Date;
}
