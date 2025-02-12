import { APP_ID, Injectable } from '@angular/core';
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


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  public register(user: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/user/register`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public login(user: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/user/login`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }



  UpdateOrderStatus( newStatus: string,orderId: number,): Observable<any> {
    return this.http.put<any>(`${this.serverName}/api/supplier/order/update/${orderId}?newStatus=${newStatus}`, {}, {
      headers: this.getHeaders()
    });
  }

  addEquipment(hospitalId: number ,data: any ): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/hospital/equipment?hospitalId=${hospitalId}`, data, {
      headers: this.getHeaders()
    });
  }

  getorders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverName}/api/supplier/orders`, {
      headers: this.getHeaders()
    });
  }

  getMaintenance(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverName}/api/technician/maintenance`, {
      headers: this.getHeaders()
    });
  }

  getHospital(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverName}/api/hospitals`, {
      headers: this.getHeaders()
    });
  }

  getEquipmentById(hospitalId: number): Observable<any> {
    return this.http.get<any>(`${this.serverName}/api/hospital/equipment/${hospitalId}`, {
      headers: this.getHeaders()
    });
  }

  orderEquipment(data: any, equipmentId: number): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/hospital/order?equipmentId=${equipmentId}`, data, {
      headers: this.getHeaders()
    });
  }

  scheduleMaintenance(data: any, equipmentId: number): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/hospital/maintenance/schedule?equipmentId=${equipmentId}`, data, {
      headers: this.getHeaders()
    });
  }

  createHospital(data: any): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/hospital/create`, data, {
      headers: this.getHeaders()
    });
  }

  updateMaintenance(data: any, maintenanceId: number): Observable<any> {
    return this.http.put<any>(this.serverName + `/api/technician/maintenance/update/${maintenanceId}`, data, {
      headers: this.getHeaders()
    });
  }
}
