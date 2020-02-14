import {
  Component,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  ViewChild,
  ElementRef,
  OnChanges,
  AfterViewInit
} from '@angular/core';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { DataItem } from '../models/chart-data.model';
import { formatLabel, PieSeriesComponent } from '..';

@Component({
  selector: 'ngx-charts-pie-chart',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [chartWidth]="chartWidth"
      [legendWidth]="legendWidth"
      [showLegend]="showLegend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      [animations]="animations"
      (legendLabelActivate)="onActivate($event, true)"
      (legendLabelDeactivate)="onDeactivate($event, true)"
      (legendLabelClick)="onClick($event)"
    >
      <svg:g #Pie [attr.transform]="translation" class="pie-chart chart">
        <svg:g
          ngx-charts-pie-series
          [colors]="colors"
          [series]="data"
          [showLabels]="labels"
          [labelFormatting]="labelFormatting"
          [trimLabels]="trimLabels"
          [maxLabelLength]="maxLabelLength"
          [activeEntries]="activeEntries"
          [innerRadius]="innerRadius"
          [outerRadius]="outerRadius"
          [explodeSlices]="explodeSlices"
          [gradient]="gradient"
          [animations]="animations"
          [tooltipDisabled]="tooltipDisabled"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipText]="tooltipText"
          [chartType]="'Pie'"
          (dblclick)="dblclick.emit($event)"
          (select)="onClick($event)"
          (activate)="onActivate($event)"
          (deactivate)="onDeactivate($event)"
        />
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: ['../common/base-chart.component.scss', './pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent extends BaseChartComponent implements AfterViewInit {
  @Input() labels = false;
  @Input() legend = false;
  @Input() legendTitle: string = 'Legend';
  @Input() legendPosition: string = 'right';
  @Input() explodeSlices = false;
  @Input() doughnut = false;
  @Input() arcWidth = 0.25;
  @Input() gradient: boolean;
  @Input() activeEntries: any[] = [];
  @Input() tooltipDisabled: boolean = false;
  labelFormatting:(o: any) => any;
  @Input() trimLabels: boolean = false;
  @Input() maxLabelLength: number = 10;
  @Input() tooltipText: any;
  @Input() chartWidth: number;
  @Input() legendWidth: number;
  @Output() dblclick = new EventEmitter();
  // optional margins
  @Input() margins: number[];
  @ViewChild('Pie',{static:true}) private primarySampleComponent: ElementRef;
  //@Output() chartReady = new EventEmitter();
  @Output() select = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();
  @ContentChild('tooltipTemplate', { static: false }) tooltipTemplate: TemplateRef<any>;

  translation: string;
  outerRadius: number;
  innerRadius: number;
  data: any;
  colors: ColorHelper;
  domain: any;
  dims: any;
  showLegend = false;
  legendOptions: any;
 ngAfterViewInit(){
   if(this.legend){
     console.log();
     this.chartWidth = this.primarySampleComponent.nativeElement.getBBox().width / this.view[0]
      console.log(this.chartWidth);
      console.log(this.legendWidth);
      this.view[0] = this.chartWidth + (this.legendWidth * this.view[0])
     this.showLegend = true;
   }
 }
 identify(value: string){
   return 'Pie-Chart-' + value
 }
  update(): void {
    super.update();
    if (this.labels && this.hasNoOptionalMarginsSet()) {
      this.margins = [10, 60, 100, 75];
    } else if (!this.labels && this.hasNoOptionalMarginsSet()) {
      // default value for margins
      this.margins = [20, 20, 20, 20];
    }

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margins,
      showLegend: this.legend,
      legendPosition: this.legendPosition
    });
    //this.dims.height = this.height * 0.5;
    //this.dims.width = this.width * 0.5;
    //this.dims.xOffset = 70;
    this.maxLabelLength = 7;
    
    this.formatDates();

    const xOffset = this.margins[3] + this.dims.width / 2;
    const yOffset = this.margins[0] + this.dims.height / 2;
    this.translation = `translate(${xOffset}, ${yOffset})`;
    this.outerRadius = Math.min(this.dims.width, this.dims.height);
    if (this.labels) {
      // make room for labels
      this.outerRadius /= 3;
    } else {
      this.outerRadius /= 2;
    }
    this.innerRadius = 0;
    if (this.doughnut) {
      this.innerRadius = this.outerRadius * (1 - this.arcWidth);
    }

    this.domain = this.getDomain();

    // sort data according to domain
    this.data = this.results.sort((a, b) => {
      return this.domain.indexOf(a.name) - this.domain.indexOf(b.name);
    });

    this.setColors();
    this.legendOptions = this.getLegendOptions();
    
    
  }

  getDomain(): any[] {
    return this.results.map(d => d.label);
  }

  onClick(data: DataItem): void {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

  getLegendOptions() {
    return {
      scaleType: 'ordinal',
      domain: this.domain,
      colors: this.colors,
      title: this.legendTitle,
      position: this.legendPosition
    };
  }

  onActivate(item, fromLegend = false) {


    item = this.results.find(d => {
      if (fromLegend) {
        return d.label === item.name;
      } else {
        return d.name === item.name;
      }
    });
    

    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });
    
    if (idx > -1) {
      return;
    }

    this.activeEntries = [item, ...this.activeEntries];
    
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item, fromLegend = false) {
    item = this.results.find(d => {
      if (fromLegend) {
        return d.label === item.name;
      } else {
        return d.name === item.name;
      }
    });

    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value && d.series === item.series;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

  private hasNoOptionalMarginsSet(): boolean {
    return !this.margins || this.margins.length <= 0;
  }
  
}
