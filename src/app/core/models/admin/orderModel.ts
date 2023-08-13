export interface OrderModel {
  id?: number;
  vehicleName: string
  registrationNumber: string;
  userName: string;
  rentedDate: Date;
  returnDate: Date;
  returnedDate: Date;
  weeks: number;
  fines: number;
  total: number;
  processedBy: string;
  processedMonth: string;
  processedYear: number;
}
