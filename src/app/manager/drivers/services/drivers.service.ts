import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Driver } from 'src/app/shared/models/driver';
import { environment } from 'src/environments/environment';
import { InvitedDriver } from '../models/invitedDriver';
import { v4 as uuid } from 'uuid';
import { DriverGroupResult, DriverGroupScores, DriverGroupSummary } from '../models/driverGroupResult';
import { DriverTrip, TripDetail, DriverName } from '../models/driverTrip';
import { TripFilter, TripFilters } from '../models/tripFilter';


@Injectable({
    providedIn: 'root'
})
export class DriversService {

    driverResultsSubject = new BehaviorSubject<DriverGroupResult>(null);
    driverTripsSubject = new BehaviorSubject<DriverTrip[]>([]);
    tripSubject = new BehaviorSubject<TripDetail>(null);
    driverTripCountSubject = new BehaviorSubject<number>(0);
    driverTripCountObservable = this.driverTripCountSubject.asObservable();
    driverTripsObservable = this.driverTripsSubject.asObservable();
    tripObservable = this.tripSubject.asObservable();
    driverResult = this.driverResultsSubject.asObservable();
    constructor(private http: HttpClient) { }
    InviteDriver(driver: InvitedDriver[]) {
        return this.http.post(environment.apiUrl + `/manager`, driver)
    }
    LoadGroupDriverResults(groupId: uuid, driverId: uuid) {        
        this.http.get<DriverGroupResult>(environment.apiUrl + `/driver/driverResult/${groupId}/${driverId}`).subscribe(res => {          
            this.driverTripCountSubject.next(res.tripCount);
            this.driverResultsSubject.next(res);
        });
    }
    LoadGroupDriverScores(driverId: uuid): Observable<DriverGroupScores> {
        return this.http.get<DriverGroupScores>(environment.apiUrl + `/driver/driverScores/${driverId}`);
    }
    LoadGroupDriverSummary(driverId: uuid): Observable<DriverGroupSummary[]> {
        return this.http.get<DriverGroupSummary[]>(environment.apiUrl + `/driver/driverSummary/${driverId}`);
    }
    LoadDriverTrips(driverId: uuid, filters: TripFilters) {                
        this.http.post<DriverTrip[]>(environment.apiUrl + `/trips/${driverId}`,filters).subscribe(res => {
            this.driverTripsSubject.next(res);
            this.LoadTripDetail(driverId,res[0].tripId);
        });
    }
    LoadMoreDriverTrips(driverId: uuid,filters: TripFilters){
        this.http.post<DriverTrip[]>(environment.apiUrl + `/trips/${driverId}`,filters).subscribe(res => {
            const trips = this.driverTripsSubject.value;
            this.driverTripsSubject.next([...trips,...res]);
        });
    }
    LoadTripDetail(driverId: uuid,tripId: uuid){
        this.http.get<TripDetail>(environment.apiUrl + `/trips/${driverId}/${tripId}`).subscribe(res => {
            this.tripSubject.next(res);
        })
    }
    GetGroupDriversNames(groupId: uuid) : Observable<DriverName[]>{
       return this.http.get<DriverName[]>(environment.apiUrl + `/driver/driversName/${groupId}`);
    }
}