import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DriverTrip, TripDetail } from '../../models/driverTrip';
import { NgScrollbar } from 'ngx-scrollbar';
import { v4 as uuid } from 'uuid';
import { Position } from 'src/app/shared/models/position';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TripFilter, TripFilters } from '../../models/tripFilter';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'drivata-driver-trips',
  templateUrl: './driver-trips.component.html',
  styleUrls: ['./driver-trips.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('0ms ease-in', style({transform: 'translateX(0%)'}))
      ])
    ])
  ]
})
export class DriverTripsComponent implements OnInit, AfterViewInit, OnChanges {


  @Input() driverTrips: DriverTrip[];
  @Input() tripCount: number;
  selected: DriverTrip;
  selectedIndex = 0;
  @Output() moreTrips = new EventEmitter;
  @Output() loadTrip = new EventEmitter<uuid>();
  @Output() filterApplied = new EventEmitter<TripFilters>();
  @Input() tripDetail: TripDetail;

  @ViewChild(NgScrollbar, null) scrollRef: NgScrollbar;
  pageId = 1;
  position: Position;
  alreadyLoaded = false;
  loading= false;
  loadedTrip = null;

  //date options
  isPeriod = true;
  dateRange: Date[] = [];
  periodLabel = 'Date';
  //score options
  scoreRange: number[] = [null, null];
  scoreLimits = [0, 10];
  selectedScore = 'Safety score';

  DefaultScore = {
    name: this.selectedScore,
    value : 0
  }
  //distance options
  distanceRange: number[] = [null, null];
  distanceLimits = [0, 1000];

  //duration options 
  durationRange: number[] = [null, null];
  durationLimits = [0, 600];

  tripFilter: TripFilters = {
    pageId: 1,
    criterias: [],
  }
  constructor(private cd: ChangeDetectorRef) {


  }
  dataName= 'Safety Score';
  margin = [10, 0, 0, 10];

  ngOnInit() {
  }
  ngOnChanges(change: SimpleChanges) {
    if (this.driverTrips && this.driverTrips.length > 0 && !this.alreadyLoaded) {
      this.selected = this.driverTrips[0];
      this.alreadyLoaded = true;
    }
    let trips = change.driverTrips;
    if(trips && trips.currentValue != trips.previousValue){
      this.loading = false;
      this.loadedTrip = null;

    }
    let trip = change.tripDetail;
    if (trip && trip.currentValue != trip.previousValue) {
      this.position = {

        latitude: this.tripDetail.cords[Math.floor(this.tripDetail.cords.length / 2)].longtitude,
        longtitude: this.tripDetail.cords[Math.floor(this.tripDetail.cords.length / 2)].latitude,
        maxZoom: 40,
        zoom: 14
      }
    }
  }
  filter() {

  }
  pathUpdate(value) {

  }
  FilterByDate(value) {
    this.tripFilter.pageId = 1;
    if (value.isFilled) {
      this.isPeriod = value.isPeriod;
      this.dateRange = value.range;
      if (this.isPeriod) {
        this.periodLabel = value.selectedPeriod;
      }
      this.tripFilter.criterias.push({
        property: 'Path.StartDate',
        min: Math.round(this.dateRange[0].getTime() / 1000),
        max: Math.round(this.dateRange[1].getTime() / 1000)
      })
    }
    else {
      this.isPeriod = true;
      this.periodLabel = 'Date';
      const filterIndex = this.tripFilter.criterias.findIndex(f => f.property == 'Path.StartDate');
      this.tripFilter.criterias.splice(filterIndex,1);
      //this.tripFilter.startDate = null;
      //this.tripFilter.endDate = null;
    }
    this.filterApplied.emit(this.tripFilter);
  }
  FilterByDistance(value) {
    this.tripFilter.pageId = 1;
    if (value.isFilled) {
      if (value.range[0] != this.distanceLimits[0] && value.range[1] != this.distanceLimits[1])
        this.distanceRange = value.range;
      else if (value.range[0] != this.distanceLimits[0])
        this.distanceRange = [value.range[0], this.distanceLimits[1]];
      else if (value.range[1] != this.distanceLimits[1])
        this.distanceRange = [this.distanceLimits[0], value.range[1]];
      else {
        this.distanceRange = [this.distanceLimits[0], this.distanceLimits[1]];
        let filterindex = this.tripFilter.criterias.findIndex(f => f.property == 'ItineraryStatistics.distance');
        this.tripFilter.criterias.splice(filterindex, 1)
      }
      this.tripFilter.criterias.push({ property: 'ItineraryStatistics.distance', min: this.distanceRange[0] * 1000, max: this.distanceRange[1] * 1000})
    }
    else {
      let filterindex = this.tripFilter.criterias.findIndex(f => f.property == 'ItineraryStatistics.distance');
      this.tripFilter.criterias.splice(filterindex, 1)
      this.distanceRange = [null, null];
    }
    this.filterApplied.emit(this.tripFilter);
  }
  FilterByDuration(value) {
    this.tripFilter.pageId = 1;

    if (value.isFilled) {
      if (value.range[0] != this.durationLimits[0] && value.range[1] != this.durationLimits[1])
        this.durationRange = value.range;
      else if (value.range[0] != this.durationLimits[0])
        this.durationRange = [value.range[0], this.durationLimits[1]];
      else if (value.range[1] != this.durationLimits[1])
        this.durationRange = [this.durationLimits[0], value.range[1]];
      else {
        this.durationRange = [this.durationLimits[0], this.durationLimits[1]];
        let filterindex = this.tripFilter.criterias.findIndex(f => f.property == 'ItineraryStatistics.tripDuration');
        this.tripFilter.criterias.splice(filterindex, 1);
      }
      this.tripFilter.criterias.push({ property: 'ItineraryStatistics.tripDuration', min: this.durationRange[0] * 60, max: this.durationRange[1] * 60});
    }
    else {
      this.durationRange = [null, null];
      let filterindex = this.tripFilter.criterias.findIndex(f => f.property == 'ItineraryStatistics.tripDuration');
      this.tripFilter.criterias.splice(filterindex,1);
    }
    this.filterApplied.emit(this.tripFilter);

  }
  FilterByScore(value) {
    this.tripFilter.pageId = 1;

    if (value.isFilled) {
      let filterindex = this.tripFilter.criterias.findIndex(f => f.property.toLocaleLowerCase().includes('score'));
        this.tripFilter.criterias.splice(filterindex,1);
      this.selectedScore = value.selectedScore;
      if (value.range[0] != this.scoreLimits[0] && value.range[1] != this.scoreLimits[1])
        this.scoreRange = value.range
      else if (value.range[0] != this.scoreLimits[0])
        this.scoreRange = [value.range[0], this.scoreLimits[1]];
      else if (value.range[1] != this.scoreLimits[1])
        this.scoreRange = [this.scoreLimits[0], value.range[1]];
      else {
        this.scoreRange = [this.scoreLimits[0], this.scoreLimits[1]];
        let filterindex = this.tripFilter.criterias.findIndex(f => f.property.toLocaleLowerCase().includes('score'));
        this.tripFilter.criterias.splice(filterindex,1);

      }
      this.tripFilter.criterias.push({
        property : this.GetScoreAttribute(),
        min : this.scoreRange[0],
        max: this.scoreRange[1]
      })
    } else{
      this.scoreRange = [null, null];
      let filterindex = this.tripFilter.criterias.findIndex(f => f.property.toLocaleLowerCase().includes('score'));
      this.tripFilter.criterias.splice(filterindex,1);
    }
      this.filterApplied.emit(this.tripFilter);

  }
  ngAfterViewInit() {
    this.scrollRef.scrollable.elementScrolled().subscribe(e => {
      let i = this.scrollRef.scrollViewport.measureScrollOffset('bottom');            
      if (i < 1 && !this.loading ) {
        this.loading = true;
        this.tripFilter.pageId++;
        this.moreTrips.emit({ filter: this.tripFilter });
      }

    });
  }
  LoadTripDetail(tripId, index) {
    if(this.selectedIndex != index){
    this.selectedIndex = index;
    this.selected = this.driverTrips[this.selectedIndex];
    this.loadTrip.emit(tripId);
    }
  }
  ViewTripDetail(value) {
    this.loadedTrip = value;
  }
  DeleteTrip(value) {

  }
  GetScoreAttribute() {
    switch (this.selectedScore) {
      case 'Safety score':
        return 'Safety.safetyScore';
      case 'Eco driving score':
        return 'EcoDriving.score';
      case 'Distraction score':
        return 'DriverDistraction.score'
    }
  }


}
