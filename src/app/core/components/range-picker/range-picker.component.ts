import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'drivata-range-picker',
  templateUrl: './range-picker.component.html',
  styleUrls: ['./range-picker.component.scss']
})
export class RangePickerComponent implements OnInit,OnChanges {
  

  minValue :number;
  highValue:number;
  @Input() limits: number[];
  @Input() unit = '';
  @Input() label = '';
  @Output() RangeSelected = new EventEmitter<any>();
  options: Options = {
    combineLabels: () =>  '',
     hideLimitLabels: true,
  };
  ngOnChanges() {
    if(this.limits.length !=0){
      this.options.floor = this.limits[0];
      this.options.ceil = this.limits[1];
      this.options.translate = (value: number, label: LabelType) => value + this.unit;
      this.minValue = this.limits[0];
      this.highValue = this.limits[1];
      
    }
  }
  constructor() { }

  ngOnInit() {
  }
  SetMinValue(value){
    
  }
  SetHighValue(){

  }
  ChangeDisplay(){

  }
  Reset(){
    this.minValue = this.limits[0];
    this.highValue = this.limits[1];
    this.RangeSelected.emit({isFilled: false, range: [this.minValue,this.highValue]});

  }
  Apply(){
    let isFilled = false;
    if(this.highValue != this.limits[1] || this.minValue != this.limits[0])
    isFilled = true;
    this.RangeSelected.emit({isFilled: isFilled, range: [this.minValue,this.highValue]});
  }

}
