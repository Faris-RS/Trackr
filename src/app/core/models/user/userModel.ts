import { RentedModel } from './vehicelModel';

export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserProfileModel {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    image: string;
    isRenting: boolean;
  };
  rentedVehicles: [RentedModel];
}
