import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { v4 as uuid } from 'uuid';
import { Driver } from 'src/app/shared/models/driver';
import { Observable, BehaviorSubject } from 'rxjs';
import { GroupStat } from '../models/group.stat';
import { GroupSummary } from '../models/group.summary';
import { Listing } from 'src/app/core/models/listing';
import { map, mergeMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  driversSubject = new BehaviorSubject<Driver[]>([]);
  groupStatSubject = new BehaviorSubject<GroupStat>(null);
  driverCountSubject = new BehaviorSubject<number>(null);
  groupSummarySubject = new BehaviorSubject<GroupSummary[]>([]);
  driversObservable = this.driversSubject.asObservable();
  groupStatObservable = this.groupStatSubject.asObservable();
  driverCountObservable = this.driverCountSubject.asObservable();
  groupSummariesObservable = this.groupSummarySubject.asObservable();

  constructor(private http: HttpClient) { }
  GetDriversByGroupId(groupId: uuid) {
    this.http.get<Driver[]>(environment.apiUrl + `/Dashboard/${groupId}`).subscribe(res => {
      this.driversSubject.next(res);
    });
  }
  GetGroupStat(groupId: uuid){
    this.http.post<GroupStat>(environment.apiUrl + `/Dashboard/${groupId}/GroupStat`,{}).subscribe(res => {
      this.groupStatSubject.next(res);
      this.driverCountSubject.next(res.driversCount);

    })
  }
  GetGroupSummary(groupId: uuid){
    this.http.get<GroupSummary[]>(environment.apiUrl + `/Dashboard/${groupId}/GroupSummary`).subscribe(res => this.groupSummarySubject.next(res));
  }

}
