import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { formatLabel, escapeLabel } from '../drivata-charts';

@Component({
  selector: 'drivata-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  

  @Input() data: any[];
  @Input() dataName: string;
  @Input() view: [number,number];
  @Input() colors: string;
  @Input() pieTooltipText :(o: any) => any;
  @Input() chartWidth: number;
  @Input() legendWidth: number;
  @Input() pieLegend: boolean;
  @Output() dbclick = new EventEmitter();
  @Output() select = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  legentTitle = 'legend'

  constructor() { }

  ngOnInit() {
  }
  Activate(value){
    this.activate.emit(value);
  }

  

}
