import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'drivata-period-picker',
  templateUrl: './period-picker.component.html',
  styleUrls: ['./period-picker.component.scss']
})
export class PeriodPickerComponent implements OnInit {
  selectedDate = 'no date selected';
  range: Date[] = [];
  isPeriod = false;
  @Output() DateSelected = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  GetDate(range: Date[]) {
    //this.selectedDate = 'from ' + new DatePipe('en-US').transform(range[0], 'mediumDate') + ' to ' + new DatePipe('en-US').transform(range[1], 'mediumDate');
    this.range = range;
    this.isPeriod = false;
  }
  Reset() {
    this.selectedDate = 'no date selected';
    this.range = [];
    this.DateSelected.emit({range:this.range,isPeriod: this.isPeriod,selectedPeriod: this.selectedDate,isFilled: false});

  }
  Apply(){
    let isFilled = false;
    if(this.range.length != 0){
      isFilled =true;
    }
    this.DateSelected.emit({range:this.range,isPeriod: this.isPeriod,selectedPeriod: this.selectedDate,isFilled: isFilled});
  }
  ChoosePeriod(value) {
    this.range = [];
    this.isPeriod = true;
    let currentDate = new Date();
    switch (value) {
      case 1:{
        this.selectedDate = 'This week';
        let weekStart = currentDate;
        weekStart.setDate(currentDate.getDate() - currentDate.getDay())
        this.range = [weekStart,currentDate]
        break;
      }
      case 2:{
        this.selectedDate = 'Last week';
        let weekStart = currentDate;
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        let lastWeek = new Date(weekStart);
        lastWeek.setDate(lastWeek.getDate() - 7);
        this.range = [lastWeek,weekStart]

        break;
      }
      case 3:{
        this.selectedDate = 'This month';
        let monthStart = new Date(currentDate);
        monthStart.setDate(1);
        this.range = [monthStart,currentDate]
        break;
      }
      case 4:{
        this.selectedDate = 'Last month';
        let monthStart = currentDate;
        monthStart.setDate(0);
        let lastMonth = new Date(monthStart);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        this.range = [lastMonth,monthStart];
        break;
      }
      case 5:{
        this.selectedDate = 'Last three months';
        let monthStart = currentDate;
        monthStart.setDate(0);
        let lastMonth = new Date(monthStart);
        lastMonth.setMonth(lastMonth.getMonth() - 3);
        this.range = [lastMonth,monthStart];
        break;
      }
      case 6:{
        this.selectedDate = 'This year';
        let thisYear = new Date(currentDate);
        thisYear.setMonth(0);
        thisYear.setDate(1);
        this.range = [thisYear,currentDate];
        break;
      }
    }
  }


}
