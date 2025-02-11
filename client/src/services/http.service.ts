
// import { APP_ID, Injectable } from '@angular/core';

// // import { Injectable } from '@angular/core';

// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../environments/environment.development';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpService {

//   public serverName = environment.apiUrl;

//   constructor(private http: HttpClient, private authService: AuthService) { }

//   private getHeaders() {
//     const token = this.authService.getToken();
//     return {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       })
//     };
//   }

//   login(data: any): Observable<any> {
//     return this.http.post<any>(`${this.serverName}/login`, data);
//   }

//   register(data: any): Observable<any> {
//     return this.http.post<any>(`${this.serverName}/register`, data);
//   }

//   updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
//     return this.http.put<any>(`${this.serverName}/supplier/order/update/${orderId}?newStatus=${newStatus}`, {}, this.getHeaders());
//   }

//   addEquipment(data: any): Observable<any> {
//     return this.http.post<any>(`${this.serverName}/hospital/equipment`, data, this.getHeaders());
//   }

//   getOrders(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.serverName}/supplier/orders`, this.getHeaders());
//   }

//   getMaintenanceTasks(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.serverName}/technician/maintenance`, this.getHeaders());
//   }

//   getHospitals(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.serverName}/hospitals`, this.getHeaders());
//   }

//   getEquipmentById(hospitalId: number): Observable<any> {
//     return this.http.get<any>(`${this.serverName}/hospital/equipment/${hospitalId}`, this.getHeaders());
//   }

//   updateMaintenance(maintenanceId: number, data: any): Observable<any> {
//     return this.http.put<any>(`${this.serverName}/technician/maintenance/update/${maintenanceId}`, data, this.getHeaders());
//   }

//   orderEquipment(equipmentId: number, data: any): Observable<any> {
//     return this.http.post<any>(`${this.serverName}/hospital/order?equipmentId=${equipmentId}`, data, this.getHeaders());
//   }

//   scheduleMaintenance(equipmentId: number, data: any): Observable<any> {
//     return this.http.post<any>(`${this.serverName}/hospital/maintenance/schedule?equipmentId=${equipmentId}`, data, this.getHeaders());
//   }

//   createHospital(data: any): Observable<any> {
//     return this.http.post<any>(`${this.serverName}/hospital/create`, data, this.getHeaders());
//   }

//   getMaintenance():Observable<any>{
//     return this.http.get<any>(this.serverName+`/api/technician/maintenance`);
//   }

//   updateMaintenance(maintenanceId:number,maintenance:any):Observable<any>{
//     return this.http.put<any>(this.serverName+`/api/technician/maintenance/update/${maintenanceId}`, maintenance);
//   }

//   getHospital():Observable<any>{
//     return this.http.get<any>(this.serverName+`/api/hospitals`);

//   }
// }




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

  // private getHeaders() {
  //   const token = this.authService.getToken();
  //   return {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     })
  //   };
  // }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // Register and login
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

  // login(data: any): Observable<any> {
  //   return this.http.post<any>(`${this.serverName}/api/user/login`, data);
  // }

  // register(data: any): Observable<any> {
  //   return this.http.post<any>(`${this.serverName}/api/user/register`, data,);
  // }

  updateOrderStatus(orderId: number, newStatus: string): Observable<any> {
    return this.http.put<any>(`${this.serverName}/api/supplier/order/update/${orderId}?newStatus=${newStatus}`, {}, {
      headers: this.getHeaders()
    });
  }

  addEquipment(data: any, hospitalId: number): Observable<any> {
    return this.http.post<any>(`${this.serverName}/api/hospital/equipment?hospitalId=${hospitalId}`, data, {
      headers: this.getHeaders()
    });
  }

  getOrders(): Observable<any[]> {
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
