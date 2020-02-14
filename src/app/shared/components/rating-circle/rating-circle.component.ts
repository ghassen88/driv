import { Component, Input, ContentChild, TemplateRef, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { formatLabel, escapeLabel, BaseChartComponent, ViewDimensions, ColorHelper, trimLabel } from '../drivata-charts/common';
import {  scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';


@Component({
  selector: 'drivata-rating-circle',
  templateUrl: './rating-circle.component.html',
  styleUrls: ['./rating-circle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingCircleComponent extends BaseChartComponent implements AfterViewInit {
   
  @Input() tooltipText: (o: any) => any;
  @Input() tooltipDisabled: boolean = false;
  @Input() startAngle: number = 120;
  @Input() angleSpan: number = 240;
  @Input() min: number = 0;
  @Input() max: number = 10;
  @Input() activeEntries: any[] = [];
  @Input() valueFormatting: (value: any) => string;
  @Input() showAxis: boolean = true;
  @Input() bigSegments: number = 1;
  @Input() smallSegments: number = 0;
  @Input() axisTickFormatting: any;
  @Input() showText: boolean = true;
  @Input() limitDistance = 4;
  @Input() logo: number;
  @Input() showRange = true;
  @Input() showstate = true;
  //@Input() chartWidth: number;
  @Input() showLines = false;
  @Input() dataName:string;
  @Input() dataValue:number;
  //@Input() chartWidth: number;
  textValue: string = '';
  units: string = '';
  arc:any;
  rotation = '';
  dims: ViewDimensions;
  valueDomain: any;
  valueScale: any;
  displayValue: string;
  textTransform: string = 'scale(0.8,0.8)';
  resizeScale: number = 1;
  legendOptions: any;
  logoRef = "assets/img/svg/icons/";





  @Input() margin = [30, 0, 0, 10];
  transform: string;
  data:any;
  domain: any[];
  series:any;

  textRadius: number; // max available radius for the text
  cornerRadius: number = 10;

  colorScale: ColorHelper;
  outerRadius: number;
  legend =true;
  legendTitle = 'Legend';
  legendPosition = 'right';
  colors: ColorHelper;
  

  animations = true;

  // axis config
  rotationAngle: number;
  rotate: string = '';
  ticks: any;
  isReadyData = false;

  @ContentChild('tooltipTemplate', { static: false }) tooltipTemplate: TemplateRef<any>;
  @ViewChild('textEl', { static: false }) textEl: ElementRef;

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.textValue = this.results.name;
    this.units = this.results.unit;
  }
  
  update(): void{

    
    
    if(this.dataValue){
      this.results = {
        name: this.dataName,
        value: this.dataValue
      };
    };
    if (this.view) {
      this.width = this.view[0];
      this.height = this.view[1];
    } else {
      const dims = this.getContainerDims(); 
           
      if (dims) {
        this.width = dims.width;
        this.height = dims.height;
      }
      
    }
    if (!this.width) {
      this.width = 600;
    }

    if (!this.height) {
      this.height = 400;
    }
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    if (!this.showAxis) {
      if (!this.margin) {
        this.margin = [10, 20, 10, 20];
      }
    } else {
      if (!this.margin) {
        this.margin = [60, 100, 60, 100];
      }
    }

    // make the starting angle positive
    if (this.startAngle < 0) {
      this.startAngle = (this.startAngle % 360) + 360;
    }
    this.angleSpan = Math.min(this.angleSpan, 360);

    this.dims = this.calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showLegend: this.legend,
      legendPosition: this.legendPosition
    });        
    
    this.domain = this.results.name;
    this.valueDomain = [this.min,this.max]
    this.valueScale = this.getValueScale();
    this.displayValue = this.getDisplayValue();
    this.outerRadius = Math.min(this.dims.width, this.dims.height) / 3;
    this.arc = this.getArc();
    this.customColors = (color: string) => {
      return color;
    }
    this.setColors();    
    this.legendOptions = this.getLegendOptions();
    const xOffset = this.margin[3] + this.dims.width / 2;
    const yOffset = this.margin[0] + this.dims.height / 2;

    
        
    this.transform = `translate(${xOffset}, ${yOffset})`;
    this.rotation = `rotate(${this.startAngle})`;
    if(!this.isReadyData){
      if(this.results.value < this.logo)
        this.logoRef = this.logoRef + 'down' + '.svg';
      else if(this.results.value > this.logo)
        this.logoRef = this.logoRef + 'up' + '.svg';
      else 
      this.logoRef = this.logoRef + 'stable' + '.svg';

    }
    this.isReadyData = true;

    this.updateAxes();
    this.height = Math.ceil(this.height * 1.38);



  }
 
  defaultTooltipText({ data }): string {
    
    const label = trimLabel(formatLabel(data.name));
    const val = data.value.toLocaleString();

    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${val}</span>
    `;
    
  }
 
  pieTooltipText({ data }) {
    const label = formatLabel(data.name);
    const val = formatLabel(data.value);

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">$${val}</span>
    `;
  }

  setColors(): void {
    
    this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }
  
  getArc(): any{
    const availableRadius = this.outerRadius * 0.4;
    const radiusPerArc = availableRadius;
    const arcWidth = radiusPerArc * 0.4;
    this.textRadius = this.outerRadius - 1 * radiusPerArc;
    this.cornerRadius = Math.floor(arcWidth / 2);
    const outerRadius = this.outerRadius + radiusPerArc;
      const innerRadius = outerRadius - arcWidth;

      const backgroundArc = {
        endAngle: (this.angleSpan * Math.PI) / 180,
        innerRadius,
        outerRadius,
        data: {
          value: this.max,
          name: this.results.name
        }
      };
      const valueArc = {
        endAngle: (Math.min(this.valueScale(this.results.value), this.angleSpan) * Math.PI) / 180,
        innerRadius,
        outerRadius,
        data: {
          value: this.results.value,
          name: this.results.name
        }
      };
      const arc = {
        backgroundArc,
        valueArc
      };
      return arc;
  }
  getValueScale(): any {
    return scaleLinear()
      .range([0, this.angleSpan])
      .nice()
      .domain(this.valueDomain);
  }
  isActive(entry): boolean {
    if (!this.activeEntries) return false;
    const item = this.activeEntries.find(d => {
      return entry.name === d.name && entry.series === d.series;
    });
    return item !== undefined;
  }
  getDisplayValue(): string {
    const value = this.results.value;

    if (this.textValue && 0 !== this.textValue.length) {
      return this.textValue.toLocaleString();
    }

    if (this.valueFormatting) {
      return this.valueFormatting(value);
    }

    return value.toLocaleString();
  }
  scaleText(repeat: boolean = true): void {
    if (!this.showText) {
      return;
    }
    const { width } = this.textEl.nativeElement.getBoundingClientRect();
    const oldScale = this.resizeScale;

    if (width === 0) {
      this.resizeScale = 1;
    } else {
      const availableSpace = this.textRadius;
      this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
    }

    if (this.resizeScale !== oldScale) {
      this.textTransform = `scale(${this.resizeScale}, ${this.resizeScale})`;
      this.cd.markForCheck();
      if (repeat) {
        setTimeout(() => this.scaleText(false), 50);
      }
    }
  }
  getLegendOptions(): any {
    return {
      scaleType: 'ordinal',
      colors: this.colors,
      domain: this.domain,
      title: this.legendTitle,
      position: this.legendPosition
    };
  }
  updateAxes(){
    this.rotationAngle = -90 + this.startAngle;
    this.rotate = `rotate(${ this.rotationAngle})`;
    this.ticks = this.getTicks();    
  }
  getTicks(){
    const bigTickSegment = this.angleSpan / this.bigSegments;
    const smallTickSegment = bigTickSegment / (this.smallSegments);
    const tickLength = 20;
    const ticks = {
      big: [],
      small: []
    };
    
    const startDistance = this.outerRadius + this.limitDistance;
    const textDist = startDistance + tickLength + this.limitDistance;
    for (let i = 0; i <= this.bigSegments; i++) {
      const angleDeg = i * bigTickSegment;
      const angle = angleDeg * Math.PI / 180;
      
      const textAnchor = this.getTextAnchor(angleDeg);
      
      
      let skip = false;
      if (i === 0 && this.angleSpan === 360) {
        skip = true;
      }

      if (!skip) {
        
        let text = Number.parseFloat(this.valueScale.invert(angleDeg).toString()).toLocaleString();        
        if (this.axisTickFormatting) {
          text = this.axisTickFormatting(text);
        }
        ticks.big.push({
          line: this.getTickPath(startDistance, tickLength, angle),
          textAnchor,
          text,
          textTransform: `
            translate(${textDist * Math.cos(angle) - 3}, ${textDist * Math.sin(angle)}) rotate(${ -this.rotationAngle })
          `
        });
      }

      if (i === this.bigSegments) {
        continue;
      }

      for (let j = 1; j <= this.smallSegments; j++) {
        const smallAngleDeg = angleDeg + j * smallTickSegment;
        const smallAngle = smallAngleDeg * Math.PI / 180;

        ticks.small.push({
          line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
        });
      }
    }
    return ticks;
  }

  getTextAnchor(angle) {
    // [0, 45] = 'middle';
    // [46, 135] = 'start';
    // [136, 225] = 'middle';
    // [226, 315] = 'end';

    angle = (this.startAngle + angle) % 360;    
    let textAnchor = 'middle';
    if (angle > 45 && angle <= 135) {
      textAnchor = 'start';
    } else if (angle > 225 && angle <= 315) {
      textAnchor = 'end';
    }
    return textAnchor;
  }
  getTickPath(startDistance, tickLength, angle): any {
    const y1 = startDistance * Math.sin(angle);
    const y2 = (startDistance + tickLength) * Math.sin(angle);
    const x1 = startDistance * Math.cos(angle);
    const x2 = (startDistance + tickLength) * Math.cos(angle);

    const points = [{x: x1, y: y1}, {x: x2, y: y2}];
    const lineGenerator = line<any>().x(d => d.x).y(d => d.y);
    return lineGenerator(points);
  }
  calculateViewDimensions({
    width, height, margins, showXAxis = false, showYAxis = false, xAxisHeight = 0,
    yAxisWidth = 0, showXLabel = false, showYLabel = false, showLegend = false,
    legendType = 'ordinal', legendPosition = 'right', columns = 12
  }): ViewDimensions {
    let xOffset = 0;
    let chartWidth = width;
    let chartHeight = height;
  
    // if (showLegend && legendPosition === 'right') {

    //   if (legendType === 'ordinal') {
    //     columns -= 2;
    //   } else {
    //     columns -= 1;
    //   }
    // }
  
    chartWidth = chartWidth; //* columns / 12;
  
    //chartWidth = chartWidth// - margins[1] - margins[3];
  
    if (showXAxis) {
      chartHeight -= 5;
      chartHeight -= xAxisHeight;

      if (showXLabel) {
        // text height + spacing between axis label and tick labels
        const offset = 25 + 5;
        chartHeight -= offset;

      }
    }
  
    if (showYAxis) {
      chartWidth -= 5;
      chartWidth -= yAxisWidth;
      xOffset += yAxisWidth;
      xOffset += 10;

      if (showYLabel) {
        // text height + spacing between axis label and tick labels
        const offset = 25 + 5;
        chartWidth -= offset;
        xOffset += offset;

      }
    }
  
    chartWidth = Math.max(0, chartWidth);
    chartHeight = Math.max(0, chartHeight);
  
    return {
      width: Math.floor(chartWidth),
      height: Math.floor(chartHeight),
      xOffset: Math.floor(xOffset)
    };
  }

}
