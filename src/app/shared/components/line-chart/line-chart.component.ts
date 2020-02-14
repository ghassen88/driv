import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as shape from 'd3-shape';


@Component({
  selector: 'drivata-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  
  @Input() data: any[];
  @Input() view: [number,number];
  @Input() color: string;
   @Input() xTickValue: number[];
   @Input() yTickValue: number[];
  @Input() schemeType: string = 'ordinal';
  @Input() showYaxisLine = false;
  @Input() showXaxisLine = false;

  curves = {
    Basis: shape.curveBasis,
    'Basis Closed': shape.curveBasisClosed,
    Bundle: shape.curveBundle.beta(1),
    Cardinal: shape.curveCardinal,
    'Cardinal Closed': shape.curveCardinalClosed,
    'Catmull Rom': shape.curveCatmullRom,
    'Catmull Rom Closed': shape.curveCatmullRomClosed,
    Linear: shape.curveLinear,
    'Linear Closed': shape.curveLinearClosed,
    'Monotone X': shape.curveMonotoneX,
    'Monotone Y': shape.curveMonotoneY,
    Natural: shape.curveNatural,
    Step: shape.curveStep,
    'Step After': shape.curveStepAfter,
    'Step Before': shape.curveStepBefore,
    default: shape.curveLinear
  };
  selectedCurve : any;
  rangeFillOpacity =  12;
  constructor() { }

  ngOnInit() {
    // let i = 0;
    // let t = Object.entries(this.curves)
    // this.selectedCurve = t[0][1];
    // setInterval(() => {
    //   this.selectedCurve = t[i][1];
    //   i++;
    //   console.log(i);
      
    // },5000)
  }
  
  select(value){

  }

}
