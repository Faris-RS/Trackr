export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserProfileModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  image: string;
  isRenting: boolean;
}
