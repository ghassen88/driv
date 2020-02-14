import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'drivata-score-range-picker',
  templateUrl: './score-range-picker.component.html',
  styleUrls: ['./score-range-picker.component.scss']
})
export class ScoreRangePickerComponent implements OnInit,OnChanges {

  minValue :number;
  highValue:number;

  @Input() limits: number[];
  @Input() selectedScore = '';
  @Output() ScoreRangeSelected = new EventEmitter<any>();
  
  options: Options = {
    combineLabels: () =>  '',
     hideLimitLabels: true,
  };
  constructor() { }
  ngOnChanges() {
    if(this.limits.length !=0){
      this.options.floor = this.limits[0];
      this.options.ceil = this.limits[1];
      this.options.translate = (value: number, label: LabelType) => value.toString() ;
      this.minValue = this.limits[0];
      this.highValue = this.limits[1];
    }
  }
  ngOnInit() {
  }

  Reset(){
    this.minValue = this.limits[0];
    this.highValue = this.limits[1];
    this.ScoreRangeSelected.emit({isFilled: false, range: [this.minValue,this.highValue]});
  }
  Apply(){
    let isFilled = false;
    if(this.highValue != this.limits[1] || this.minValue != this.limits[0])
    isFilled = true;
    this.ScoreRangeSelected.emit({isFilled: isFilled, range: [this.minValue,this.highValue],selectedScore: this.selectedScore});
  }
}
