import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';
import { Observable } from 'rxjs';
import { ShortGroup } from '../models/Group';
import { DriverName } from 'src/app/manager/drivers/models/driverTrip';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }
  GetGroups(): Observable<ShortGroup[]>{
    return this.http.get<ShortGroup[]>(environment.apiUrl +`/dashboard/GetGroups/`)
  }
  GetUserName(){
    return localStorage.getItem("UserName");
  }
  GetDriver(groupId: uuid) : Observable<DriverName[]>{
    return this.http.get<DriverName[]>(environment.apiUrl + `/driver/driversName/${groupId}`);
  }
}
