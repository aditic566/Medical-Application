
import { APP_ID, Injectable } from '@angular/core';

// import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  public serverName = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHttpOptions() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/register`, data);
  }

  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    return this.http.put<any>(`${this.serverName}/supplier/order/update/${orderId}?newStatus=${newStatus}`, {}, this.getHttpOptions());
  }

  addEquipment(data: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/hospital/equipment`, data, this.getHttpOptions());
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverName}/supplier/orders`, this.getHttpOptions());
  }

  getMaintenanceTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverName}/technician/maintenance`, this.getHttpOptions());
  }

  getHospitals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverName}/hospitals`, this.getHttpOptions());
  }

  getEquipmentById(hospitalId: number): Observable<any> {
    return this.http.get<any>(`${this.serverName}/hospital/equipment/${hospitalId}`, this.getHttpOptions());
  }

  updateMaintenance(maintenanceId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.serverName}/technician/maintenance/update/${maintenanceId}`, data, this.getHttpOptions());
  }

  orderEquipment(equipmentId: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/hospital/order?equipmentId=${equipmentId}`, data, this.getHttpOptions());
  }

  scheduleMaintenance(equipmentId: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/hospital/maintenance/schedule?equipmentId=${equipmentId}`, data, this.getHttpOptions());
  }

  createHospital(data: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/hospital/create`, data, this.getHttpOptions());
  }
  
  getMaintenance():Observable<any>{
    return this.http.get<any>(this.serverName+`/api/technician/maintenance`);
  }

  updateMaintenance(maintenanceId:number,maintenance:any):Observable<any>{
    return this.http.put<any>(this.serverName+`/api/technician/maintenance/update/${maintenanceId}`, maintenance);
  }

  getHospital():Observable<any>{
    return this.http.get<any>(this.serverName+`/api/hospitals`);

  }
}


