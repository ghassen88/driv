import { Component, OnInit, AfterViewInit, AfterContentInit, TemplateRef, ViewChild, Input, OnChanges } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { DriverState } from 'src/app/shared/enums/driverState';
import { Observable } from 'rxjs';
import { Driver } from 'src/app/shared/models/driver';
import { GroupStat } from '../../models/group.stat';
import { GroupSummary } from '../../models/group.summary';


@Component({
  selector: 'drivata-dashboard-stat',
  templateUrl: './dashboard-stat.component.html',
  styleUrls: ['./dashboard-stat.component.scss']
})
export class DashboardStatComponent implements OnInit, AfterContentInit, OnChanges {


  ngAfterContentInit(): void {
    const element = document.getElementsByClassName('stat-score-container')[0];
    if (element) {
      this.view2 = [element.clientWidth * 0.45, element.clientHeight * 0.45];
      console.log(this.view2);
      
    }
  }

  view: number[] = [];
  view2: number[] = [];
  data: any[] = [];
  safetyScore = { name: 'Safety Score', value: 0 };
  ecoDrivingScore = { name: 'EcoDriving', value: 0 }
  colorScheme = 'cool';
  @Input() groupStat: GroupStat;

  down = 'down';
  up = 'up';

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (this.groupStat) {
      this.GetData();
      this.safetyScore = { name: 'Safety Score', value: this.groupStat.safetyScore };
      this.ecoDrivingScore = { name: 'ECO-DRIVING SCORE', value: this.groupStat.ecoDrivingScore }
    }
  }
  select(value) { }
  onResized2(value: ResizedEvent) {
    this.view2 = [value.newWidth * 0.45, value.newHeight * 0.45];
    console.log(this.view2);

  }
  onResized2Double(value: ResizedEvent) {
    this.view = [value.newWidth * 0.9, value.newHeight * 0.88];
  }

  GetData() {
    this.data = [
      { name: "good", value: this.groupStat.goodDriversCount },
      { name: "excelent", value: this.groupStat.excelentDriversCount },
      { name: "to monitor", value: this.groupStat.followedDriversCount },
      { name: "inactive", value: this.groupStat.inactiveDriversCount }
    ]
  }

}
