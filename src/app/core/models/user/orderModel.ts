export interface OrderModel {
  id?: number;
  vehicleName: string;
  registrationNumber: string;
  rentedDate: Date;
  returnDate: Date;
  returnedDate: Date;
  weeks: number;
  fines: number;
  total: number;
  processedMonth: string;
  processedYear: number;
}
