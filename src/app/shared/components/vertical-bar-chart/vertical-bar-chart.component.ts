import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { colorSets } from '../drivata-charts/utils/color-sets';

@Component({
  selector: 'drivata-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.scss']
})
export class VerticalBarChartComponent implements OnInit,OnChanges {
  

  @Input() data: any[];
  @Input() view: [number,number];
  @Input() color: string;
  @Input() xTickValue: number[];
  @Input() yTickValue: number[];
  @Input() schemeType: string = 'ordinal';
  @Input() double = false;

  colorScheme: any;


  constructor() { }

  ngOnInit() {
    this.setColorScheme();
  }
  ngOnChanges() {

  }
  setColorScheme() {
    this.colorScheme = colorSets.find(s => s.name === 'ocean');
  }
}
