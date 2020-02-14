import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ContextVariable } from 'src/app/shared/enums/contextVariable';
import { Context } from 'src/app/shared/enums/context';
import { StatisticsVariable } from 'src/app/shared/enums/statisticsVariable';
import { Period } from 'src/app/shared/enums/period';
import { ResizedEvent } from 'angular-resize-event';
import { DriverGroupSummary } from 'src/app/manager/drivers/models/driverGroupResult';

@Component({
  selector: 'drivata-statistics-summary',
  templateUrl: './statistics-summary.component.html',
  styleUrls: ['./statistics-summary.component.scss']
})
export class StatisticsSummaryComponent implements OnInit, OnChanges {


  @Input() summaries: DriverGroupSummary[];
  showedSummaries: DriverGroupSummary[];
  data: any;

  selectedVariable: any;
  selectedContext: any;
  selectedPeriod: any;
  selectedDisplay = 'Week';

  contexts = ContextVariable;
  variables = StatisticsVariable;
  periods = Period;



  view: number[] = [];

  constructor() { }

  ngOnInit() {

    const element = document.getElementsByClassName("chart-holder")[0];
    this.view = [element.clientWidth, element.clientHeight * 0.8];


  }
  ngOnChanges() {
    if (this.summaries && this.summaries.length != 0) {
      this.selectedVariable = Object.entries(StatisticsVariable).find(d => d[1] == StatisticsVariable.consumption)[0];
      this.selectedContext = Object.entries(ContextVariable).find(d => d[1] == ContextVariable.All)[0];
      this.selectedPeriod = this.periods.ThreeMonths;
      let date = new Date();
      date.setMonth(date.getMonth() - 3);
      this.showedSummaries = this.summaries.filter(d => new Date(d.week) > date);
      this.data = this.GetData();
    }
  }
  GetData() {
    //if (this.selectedDisplay != "Week") {
    let data = null;
    if (this.selectedContext != this.contexts.All) {
      data = this.showedSummaries.map(summary => {
        return {
          name: new Date(summary.week),
          extra: null,
          state: true,
          value: summary.contextSummaries.filter(cs => Context[cs.contextId] == this.GetContextIndex())[0][this.selectedVariable]
        }
      });
    } else {
      if (this.selectedVariable == this.variables.averageFuelConsumtion) {
        data = this.showedSummaries.map(summary => {
          return {
            name: new Date(summary.week),
            extra: null,
            state: true,
            value: (summary.contextSummaries.reduce((a, b) => a + (b[this.selectedVariable] * b.distanceTraveled), 0) / summary.contextSummaries.reduce((a, b) => a + b.distanceTraveled, 1)).toFixed(1)
          }
        });
      }
      else {
        data = this.showedSummaries.map(summary => {
          return {
            name: new Date(summary.week),
            extra: null,
            state: true,
            value: summary.contextSummaries.reduce((a, b) => a + b[this.selectedVariable], 0)
          }
        });
      }
    }
    //}
    //else {
    //let series = this.showedSummaries.
    //}
    // let data = [{
    //   name: '',
    //   series: series
    // }];
    return data;
  }
  GetContextIndex() {
    let i = Object.keys(this.contexts).findIndex(v => v == this.selectedContext);
    return Context[i];
  }
  onResized(value: ResizedEvent) {
    this.view = [value.newWidth, value.newHeight];
  }
  DisplayPerPeriod(value) {
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
  filterByVariable(value) {
    this.selectedVariable = value;
    this.data = this.GetData();
  }
  filterByContext(value) {
    this.selectedContext = value;
    this.data = this.GetData();
  }
  ChangeDisplay(value) {
    this.selectedDisplay = value;
  }
}
