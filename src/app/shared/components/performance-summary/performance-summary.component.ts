import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PerformanceVariable } from 'src/app/shared/enums/performanceVariable';
import { ContextVariable } from 'src/app/shared/enums/contextVariable';
import { Period } from 'src/app/shared/enums/period';
import { Context } from 'src/app/shared/enums/context';
import { ResizedEvent } from 'angular-resize-event';
import { DriverGroupSummary } from 'src/app/manager/drivers/models/driverGroupResult';

@Component({
  selector: 'drivata-performance-summary',
  templateUrl: './performance-summary.component.html',
  styleUrls: ['./performance-summary.component.scss']
})
export class PerformanceSummaryComponent implements OnInit, OnChanges {


  @Input() summaries: DriverGroupSummary[];
  showedSummaries: DriverGroupSummary[];
  //yTickValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  selectedVariable: any;

  selectedContext: any;
  selectedPeriod: any;

  variables = PerformanceVariable;
  contexts = ContextVariable;
  periods = Period;
  selectedDisplay = 'Week';
  colorScheme = 'ocean';

  data: any;
  view: number[] = [];

  constructor() { }

  ngOnInit() {
    

    const element = document.getElementsByClassName("chart-holder")[0];
    this.view = [element.clientWidth, element.clientHeight * 0.8];
  }
  ngOnChanges() {
    if (this.summaries && this.summaries.length != 0) {
      this.selectedVariable = Object.entries(PerformanceVariable).find(d => d[1] == PerformanceVariable.ecoDrivingScore)[0];
      this.selectedContext = Object.entries(ContextVariable).find(d => d[1] == ContextVariable.All)[0];
      this.selectedPeriod = this.periods.ThreeMonths;
      let date = new Date();
      date.setMonth(date.getMonth() - 3);
      this.showedSummaries = this.summaries.filter(d => new Date(d.week) > date);      
      this.data = this.GetData();
    }
  }
  filterByVariable(value) {
    this.selectedVariable = value;
    this.data = this.GetData();
  }
  filterByContext(value) {
    this.selectedContext = value;
    this.data = this.GetData();
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
  ChangeDisplay(value) {
    this.selectedDisplay = value;
  }
  GetData() {
    //if (this.selectedDisplay != "Week") {
      let series = null;      
      if(this.selectedContext != this.contexts.All){
        series = this.showedSummaries.map(summary => {
          return {
            name: new Date(summary.week),
            value: summary.contextSummaries.filter(cs => Context[cs.contextId] == this.GetContextIndex())[0][this.selectedVariable]
          }
        })
      }
      else {
        if(this.IsScore()){
          series = this.showedSummaries.map(summary => {
            return {
              name: new Date(summary.week),
              value: (summary.contextSummaries.reduce((a, b) => a + (b[this.selectedVariable] * b.distanceTraveled), 0) / summary.contextSummaries.reduce((a, b) => a + b.distanceTraveled, 1)).toFixed(1)
            }
          })
        }
        else {
          series = this.showedSummaries.map(summary => {
            return {
              name: new Date(summary.week),
              value: summary.contextSummaries.reduce((a, b) => a + b[this.selectedVariable],0)
            }
          })
        }
      }
       
    //}
    //else {
      //let series = this.showedSummaries.
    //}
    let data = [{
      name: '',
      series: series
    }];
    return data;
  }
  onResized(value: ResizedEvent) {
    this.view = [value.newWidth, value.newHeight];
  }
  GetContextIndex() {
    let i = Object.keys(this.contexts).findIndex(v => v == this.selectedContext);
    return Context[i];
  }
  IsScore(){
    if(this.selectedVariable == 'ecoDrivingScore' || this.selectedVariable == 'safetyScore' || this.selectedVariable == 'distractionScore')
      return true;
    return false;
  }

}
