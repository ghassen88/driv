import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'drivata-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit,OnChanges {
  

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  @Output() dateSelected = new EventEmitter<Date[]>();
  @Input() range: Date[] = [];
  constructor(calendar: NgbCalendar) {
    //this.fromDate = calendar.getToday();
    //this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
  ngOnChanges() {
    if(this.range.length == 0){
      this.toDate = null;
      this.fromDate = null;
    }
  }
  ngOnInit() {
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate && this.toDate) {
      let range = [new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day),
        new Date(this.toDate.year, this.toDate.month- 1, this.toDate.day)];
      this.dateSelected.emit(range);
    }
  }
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}
