import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  showError: boolean = false;
  errorMessage: any;
  showMessage: any;
  responseMessage: any;
  orderList: any[] = [];
  statusModel: any = { newStatus: null };
  roleName: string | null | undefined;

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.roleName = this.authService.getRole;
    if (this.roleName === 'SUPPLIER') {
      this.getOrders();
    }
  }

  getOrders(): void {
    this.httpService.getorders().subscribe({
      next: (data) => {
        this.orderList = data;
      },
      error: (error) => {
        this.showError = true;
        this.errorMessage = error.error.message || 'Failed to load orders';
      }
    });
  }



  edit(value: any): void {
    this.statusModel.cargoId = value.id;
  }

  update(order: any): void {
    if (order.status) {
      this.httpService.UpdateOrderStatus(order.status, order.id).subscribe({
        next: () => {
          this.showMessage = true;
          this.responseMessage = 'Order status updated successfully!';
          this.getOrders();
          setTimeout(() => this.showMessage = false, 3000);
        },
        error: (error) => {
          this.showError = true;
          this.errorMessage = error.error.message || 'Failed to update order status';
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

}



