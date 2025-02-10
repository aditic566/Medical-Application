import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverName=environment.apiUrl;
  constructor(private http:HttpClient){}
  //todo: complete missing code.. 
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
