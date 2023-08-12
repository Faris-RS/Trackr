export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  blocked: boolean;
}

export interface RentData {
  rentedBy: string;
  returnDate: Date;
  rentedDate: Date;
  email?: string;
  selectedVehicle?: string
}
