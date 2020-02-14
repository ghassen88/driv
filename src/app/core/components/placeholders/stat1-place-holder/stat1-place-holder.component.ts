import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'drivata-stat1-place-holder',
  templateUrl: './stat1-place-holder.component.html',
  styleUrls: ['./stat1-place-holder.component.scss']
})
export class Stat1PlaceHolderComponent implements OnInit,AfterViewInit {
  ngAfterViewInit() {
    
  }
  onResized(value:ResizedEvent){
    this.height = value.newHeight;
    this.width = value.newWidth;
  }
  width = 400;
  height = 130;
  constructor() { }

  ngOnInit() {
    const element = document.getElementsByClassName("placeholder")[0];
    this.height = element.clientHeight;
    this.width = element.clientWidth;
  }

}
