import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  faFileExcel,
  faFilePdf,
  faPen,
  faRotateLeft,
  faSearch,
  faTrash,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { HotToastService } from '@ngneat/hot-toast';
import { Subject, takeUntil } from 'rxjs';
import { AdminOrderHistoryService } from 'src/app/core/services/order-history/admin-order-history/admin-order-history.service';
import { OrderModel } from 'src/app/core/models/admin/orderModel';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-admin-order-history',
  templateUrl: './admin-order-history.component.html',
  styleUrls: ['./admin-order-history.component.css'],
})
export class AdminOrderHistoryComponent {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  constructor(
    private service: AdminOrderHistoryService,
    private toast: HotToastService,
    private cdRef: ChangeDetectorRef
  ) {
    const currentYear = new Date().getFullYear();
    for (let i = this.intialYear; i <= currentYear; i++) {
      this.yearOptions.push(i);
    }
  }
  private ngUnsubscribe = new Subject<void>();

  edit = faPen;
  trash = faTrash;
  rentUser = faUserPlus;
  return = faRotateLeft;
  apply = faSearch;
  pdf = faFilePdf;
  excel = faFileExcel;

  sortColumn: keyof OrderModel | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  searchText: string = '';
  filteredOrders: OrderModel[] = [];
  loading: boolean = false;

  orders: OrderModel[] = [];

  // Year options initialiser
  intialYear: number = 2023;
  currentYear: number = new Date().getFullYear();
  yearOptions: number[] = [];

  // Month options initialiser
  monthOptions: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  currentMonth: string = new Date().toLocaleString('en-US', { month: 'long' });

  ngOnInit() {
    // this.retrieveVehicles();
    this.retrieveOrders();
    this.orders = this.orders.filter(
      (order) =>
        order.userName.toLowerCase().includes(this.searchText) ||
        order.registrationNumber.toLowerCase().includes(this.searchText)
    );
    this.applySortAndFilter();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  retrieveOrders(): void {
    this.loading = true;
    this.service
      .retrieveOrders(this.currentMonth, this.currentYear)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        this.toast.success(result.message);
        this.orders = result.orders.map((order: any, index: number) => ({
          id: index + 1,
          vehicleName: order.vehicle.vehicleName,
          registrationNumber: order.vehicle.registrationNumber,
          userName: order.user.firstName + ' ' + order.user.lastName,
          rentedDate: order.rentedDate,
          returnDate: order.returnDate,
          returnedDate: order.returnedDate,
          weeks: order.weeks,
          fines: order.fines,
          total: order.total,
          processedBy:
            order.processedBy.firstName + ' ' + order.processedBy.lastName,
        }));
        this.filteredOrders = this.orders;
        this.applySortAndFilter();
        this.cdRef.detectChanges();
        this.loading = false;
      });
  }

  toggleSort(column: keyof OrderModel): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applySortAndFilter();
  }

  applySortAndFilter(): void {
    this.applySort();
    this.applyFilter();
  }

  applySort(): void {
    if (this.sortColumn) {
      this.orders.sort((a, b) => {
        const aValue = a[this.sortColumn as keyof OrderModel];
        const bValue = b[this.sortColumn as keyof OrderModel];
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return this.sortDirection === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          return this.sortDirection === 'asc'
            ? aValue === bValue
              ? 0
              : aValue
              ? -1
              : 1
            : aValue === bValue
            ? 0
            : aValue
            ? 1
            : -1;
        }
        return 0;
      });
    }
  }

  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase();
    this.filteredOrders = this.orders.filter(
      (orders) =>
        orders.userName.toLowerCase().includes(filterValue) ||
        orders.registrationNumber.toLowerCase().includes(filterValue)
    );
  }

  downloadPDF(): void {
    this.loading = true;
    const pdfContent = document.getElementById('pdf-content');
    if (pdfContent) {
      const margin = 20;

      html2canvas(pdfContent).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth, pdfHeight);
        pdf.save(`${this.currentMonth} ${this.currentYear}` + '.pdf');
      });
    }
    this.loading = false;
  }

  downloadExcel(): void {
    this.loading = true;
    if (this.orders.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(this.orders);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      FileSaver.saveAs(
        blob,
        `${this.currentMonth} ${this.currentYear}` + '.xlsx'
      );
    } else this.toast.warning('There is no data to convert');
    this.loading = false;
  }
}
