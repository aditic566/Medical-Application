import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderList: any = [];
  error: string = '';
  success: string = '';
  roleName: string | null | undefined;
 
  orderForm: any;
  statusModel: any = { newStatus: null }
 
  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) { }
 
  ngOnInit(): void {
    this.roleName = this.authService.getRole;
    if (this.roleName == 'SUPPLIER') {
      this.getOrders();
    }
  }
 
  getOrders(): void {
    this.httpService.getorders().subscribe({
      next: (data) => {
        this.orderList = data;
      },
      error: (error) => {
        this.error = error.error.message || 'Failed to load orders';
      }
    });
  }
 
 
  onSubmit(): void { }
  viewDetails(): void { }
  edit(): void { }
 
  update(order: any): void {
    console.log('status:', order.status);
    this.httpService.UpdateOrderStatus(order.id, order.status).subscribe(() => {
      console.log('order updated');
      this.success = 'Order Updated Successfully!';
      setTimeout(() => this.success = '', 3000);
    });
  }
}
 