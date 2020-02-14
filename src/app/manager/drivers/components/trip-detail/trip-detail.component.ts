import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TripDetail } from '../../models/driverTrip';
import { Weather } from 'src/app/shared/enums/weather';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'drivata-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit, OnChanges {


  @Input() selectedTrip: TripDetail;
  view: number[] = [];
  colorScheme = 'cool';
  data: any[] = [];
  weathers = Weather;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges() {
    console.log(this.selectedTrip);
    
    this.GetData();
  }
  onResized(value: ResizedEvent) {
    this.view = [value.newWidth , value.newHeight * 0.3];
  }
  GetData() {
    this.data = [
      { name: "Highways", value: this.selectedTrip.contextsDiffusion[4].percentage },
      { name: "Extra urbain", value: this.selectedTrip.contextsDiffusion[3].percentage },
      { name: "Urbain", value: this.selectedTrip.contextsDiffusion[2].percentage },
      { name: "Dense urbain", value: this.selectedTrip.contextsDiffusion[1].percentage },
      { name: "Traffic", value: this.selectedTrip.contextsDiffusion[0].percentage }]
  }

}
