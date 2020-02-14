import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'drivata-stat2-place-holder',
  templateUrl: './stat2-place-holder.component.html',
  styleUrls: ['./stat2-place-holder.component.scss']
})
export class Stat2PlaceHolderComponent implements OnInit,AfterViewInit {
  ngAfterViewInit() {
    
  }
  onResized(value:ResizedEvent){
    this.height = value.newHeight;
    this.width = value.newWidth;
  }
  width = 400;
  height = 130;
  cercleRadius =0;
  constructor() { }

  ngOnInit() {
    const element = document.getElementsByClassName("placeholder")[0];
    this.height = element.clientHeight;
    this.width = element.clientWidth;
    this.cercleRadius = this.width * 0.25;
  }

}
