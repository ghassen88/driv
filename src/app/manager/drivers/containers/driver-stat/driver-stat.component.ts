import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { DriversService } from '../../services/drivers.service';
import { Store } from '@ngrx/store';
import { BordersState } from 'src/app/core/store/reducers/core.reducer';
import { ShortGroup } from 'src/app/core/models/Group';
import { GetSelectedGroup } from 'src/app/core/store/selectors/core.selector';
import { v4 as uuid } from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DriverGroupResult, DriverGroupScores, DriverGroupSummary } from '../../models/driverGroupResult';
import { DriverTrip, TripDetail, DriverName } from '../../models/driverTrip';
import { TripFilters } from '../../models/tripFilter';
import {Location} from '@angular/common'; 

@Component({
  selector: 'drivata-driver-stat',
  templateUrl: './driver-stat.component.html',
  styleUrls: ['./driver-stat.component.scss']
})
export class DriverStatComponent implements OnInit, AfterViewInit, AfterContentInit {



  group: ShortGroup;
  driverId: uuid;
  driverResult: DriverGroupResult;
  driverScores$: Observable<DriverGroupScores>;
  driversummary$: Observable<DriverGroupSummary[]>;
  driverTrips$: Observable<DriverTrip[]>;
  selectedTrip$: Observable<TripDetail>;
  tripCount$: Observable<number>;
  drivers$: Observable<DriverName[]>;
  pageId = 1;
  @ViewChild('Cartography', null)
  private defaultSummary: TemplateRef<any>;
  tripFilter: TripFilters = {
    pageId: 1,
    criterias: [],
  }
  selectedSummary: TemplateRef<any>

  constructor(private driverService: DriversService,
    private borderStore: Store<BordersState>,
    private route: ActivatedRoute,
    private location: Location) {

  }

  ngOnInit() {

    this.selectedSummary = this.defaultSummary;

  }
  ngAfterViewInit() {

  }
  ngAfterContentInit() {
    this.borderStore.select(GetSelectedGroup).subscribe(res => {
      if (res != null) {
        this.group = res;
        this.driverId = this.route.snapshot.params.driverId;
        this.drivers$ = this.driverService.GetGroupDriversNames(this.group.groupId);
        this.LoadDriverData();
        this.driverService.LoadGroupDriverResults(this.group.groupId, this.driverId);
        this.driverScores$ = this.driverService.LoadGroupDriverScores(this.driverId);
        this.driversummary$ = this.driverService.LoadGroupDriverSummary(this.driverId);
        this.driverService.LoadDriverTrips(this.driverId, this.tripFilter);

        this.driverService.driverResult.subscribe(res => {
          this.driverResult = res;
        });
        this.driverTrips$ = this.driverService.driverTripsObservable;
        this.selectedTrip$ = this.driverService.tripObservable;
        this.tripCount$ = this.driverService.driverTripCountObservable;
      }
    })
  }
  loadMore(filter: TripFilters) {
    this.tripFilter.pageId++;
    this.driverService.LoadMoreDriverTrips(this.driverId, this.tripFilter)
  }
  LoadDriverData(){
    this.driverService.LoadGroupDriverResults(this.group.groupId, this.driverId);
    this.driverScores$ = this.driverService.LoadGroupDriverScores(this.driverId);
    this.driversummary$ = this.driverService.LoadGroupDriverSummary(this.driverId);
    this.driverService.LoadDriverTrips(this.driverId, this.tripFilter);
  }
  LoadTrip(tripId) {
    this.driverService.LoadTripDetail(this.driverId, tripId);
  }
  ApplyFilter(filter: TripFilters) {
    this.tripFilter = filter;
    this.driverService.LoadDriverTrips(this.driverId, this.tripFilter)
  }
  LoadDriver(driverId: uuid) {
    this.driverId = driverId;
    this.tripFilter = {
      criterias: [],
      pageId: 1
    }
    this.location.go(`/manager/driver/${this.driverId}`);

    this.LoadDriverData();



  }
}
