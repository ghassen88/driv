import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'drivata-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements OnInit,OnChanges {
  
  
  ngOnChanges() {
    if(this.controls.length != 0){
      this.color = this.data.map(d => {if(d.state) return {name:d.color}})

    }
    
  }


  @Input() view: number[] = [];
  @Input() data: any[] = [];
  @Input() controls: [] = [];
  roundValues = (o:any) => o;
  color:any[];
  constructor() { }

  ngOnInit() {
  }

}
