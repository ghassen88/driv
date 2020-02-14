import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { formatLabel, escapeLabel } from '../drivata-charts';

@Component({
  selector: 'drivata-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit,OnChanges {
  

  @Input() dataName: string = '';
  @Input() view: [number,number];
  @Input() data: any[];
  @Input() color: string;
  @Input() gradient: boolean;
  @Input() showValue = true;
  @Input() label :string;
  @Output() selectData = new EventEmitter<any>();
  tooltipDisabled = false;
  ShowValue: (value:number) => any;
  constructor() { }

  ngOnInit() {
  }
  pieTooltipText({ data }) {

    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }
  select(value){
    this.selectData.emit(value);
  }
  ngOnChanges() {
    if(!this.showValue)
    this.ShowValue = (value:number) => {
      return ''
    }
  }

}
