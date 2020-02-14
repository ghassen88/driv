import { Component, OnInit, Input, OnChanges, AfterViewInit, AfterContentInit } from '@angular/core';
import { GroupSummary } from '../../models/group.summary';
import { ResizedEvent } from 'angular-resize-event';
import { Period } from 'src/app/shared/enums/period';

@Component({
  selector: 'drivata-drivers-by-category',
  templateUrl: './drivers-by-category.component.html',
  styleUrls: ['./drivers-by-category.component.scss']
})
export class DriversByCategoryComponent implements OnInit, OnChanges {


  @Input() summaries: GroupSummary[];
  showedSummaries: GroupSummary[];
  data: any[];
  view: number[] = [];
  categoryControls = [
    { name: 'Inactive', color: '#647c8a', state: true },
    { name: 'To monitor', color: '#3f51b5', state: true },
    { name: "Good", color: '#2196f3', state: true },
    { name: "Excelent", color: '#00b862', state: true }
  ]
  periods = Period
  selectedPeriod: string;
  constructor() { }

  ngOnInit() {
    const element = document.getElementsByClassName("chart-holder")[0];
    this.view = [element.clientWidth, element.clientHeight];
    this.selectedPeriod = this.periods.ThreeMonths;

  }
  ngOnChanges() {
    if (this.summaries && this.summaries.length != 0) {
      let date = new Date();
      date.setMonth(date.getMonth() - 3);
      this.showedSummaries = this.summaries.filter(d => new Date(d.week) > date)
      this.data = this.GetData();
    }

  }
  onResized(value: ResizedEvent) {
    this.view = [value.newWidth, value.newHeight ];
  }
  filter(value: Period) {
    this.selectedPeriod = this.periods[value];
    let currentDate = new Date();
    switch (Period[value]) {
      case Period.ThreeMonths:
        currentDate.setMonth(currentDate.getMonth() - 3);
        break;
      case Period.SixMonths:
        currentDate.setMonth(currentDate.getMonth() - 6);
        break;
      case Period.TwelveMonths:
        currentDate.setMonth(currentDate.getMonth() - 12);
        break;
      case Period.LastYear:
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        break;
      case Period.Beginning:
        currentDate = new Date(this.summaries[0].week)
        break;
      case Period.Sofar:
        currentDate.setMonth(0);
        break;
    }
    this.showedSummaries = this.summaries.filter(d => new Date(d.week) > currentDate);
    this.data = this.GetData()
  }
  GetData() {
    return this.showedSummaries.map(summary => {
      let d = new Date(summary.week)
      return {
        name: d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate(),
        series: [
          {
            name: 'inactive',
            value: summary.inactiveCount,
            color: '#647c8a',
            state: this.categoryControls[0].state
          },
          {
            name: 'followed',
            value: summary.followedCount,
            color: '#3f51b5',
            state: this.categoryControls[1].state
          },
          {
            name: 'good',
            value: summary.goodCount,
            color: '#2196f3',
            state: this.categoryControls[2].state
          },
          {
            name: 'excelent',
            value: summary.excelentCount,
            color: '#00b862',
            state: this.categoryControls[3].state
          }
        ]
      }
    });
  }
  show(value: number) {
    this.categoryControls[value].state = !this.categoryControls[value].state;
    this.data = this.GetData();
    //this.categoryControls = [...this.categoryControls];
    // this.data = this.showedSummaries.map(summary => {
    //   let d = new Date(summary.week)
    //   return {
    //     name: d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate(),
    //     series: [
    //       {
    //         name: 'followed',
    //         value: summary.followedCount
    //       },
    //       {
    //         name: 'good',
    //         value: summary.goodCount
    //       },
    //       {
    //         name: 'excelent',
    //         value: summary.excelentCount
    //       }
    //     ]
    //   }
    // });
  }

}
