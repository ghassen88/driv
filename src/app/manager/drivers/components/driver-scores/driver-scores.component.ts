import { Component, OnInit, Input, OnChanges, AfterContentInit } from '@angular/core';
import { DriverGroupScores } from '../../models/driverGroupResult';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'drivata-driver-scores',
  templateUrl: './driver-scores.component.html',
  styleUrls: ['./driver-scores.component.scss']
})
export class DriverScoresComponent implements OnInit,OnChanges,AfterContentInit {
  @Input() driverScores:DriverGroupScores;
  colorScheme = 'cool';
  data:any[] = [];

  view : number[] = [];
  view2 : number[] = [];
  safetyScore = {name:'Safety Score',value:0};
  ecoDrivingScore = {name:'EcoDriving',value:0}
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(this.driverScores){
    this.GetData();
    this.safetyScore = {name:'Safety Score',value:this.driverScores.safetyScore};
    this.ecoDrivingScore = {name:'ECO-DRIVING SCORE',value:this.driverScores.ecoDrivingScore}
    }
  }
  ngAfterContentInit(): void {
    const element = document.getElementsByClassName( 'stat-score-container' )[0];
    if(element)
    this.view2 = [element.clientWidth * 0.45, element.clientHeight * 0.45];   
  }
  onResized2(value:ResizedEvent){
    this.view2 = [value.newWidth  *0.44,value.newHeight * 0.45];  
 }
  onResized2Double(value:ResizedEvent){
    this.view = [value.newWidth * 0.9, value.newHeight * 0.88];  
  }
  GetData(){
    this.data = [
      {name:"Highways",value:this.driverScores.drivingPerContext.contextStatisticsValues[4].distance},
      {name:"Extra urbain",value: this.driverScores.drivingPerContext.contextStatisticsValues[3].distance},
      {name:"Urbain",value:this.driverScores.drivingPerContext.contextStatisticsValues[2].distance},
      {name:"Dense urbain",value: this.driverScores.drivingPerContext.contextStatisticsValues[1].distance},
      {name:"Traffic",value:this.driverScores.drivingPerContext.contextStatisticsValues[0].distance}]
  }
  select(value){}


}
