import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { DriverGroupSummary } from '../../models/driverGroupResult';

@Component({
  selector: 'drivata-driver-summary',
  templateUrl: './driver-summary.component.html',
  styleUrls: ['./driver-summary.component.scss']
})
export class DriverSummaryComponent implements OnInit {

  @Input() driverSummaries: DriverGroupSummary[];
  @ViewChild('StatisticsSummary', null)
  private defaultSummary: TemplateRef<any>;
  summaryTemplate: TemplateRef<any>;
  selectedSummary: TemplateRef<any>

  constructor() { }

  ngOnInit() {
    this.selectedSummary = this.defaultSummary;
  }
  Show(summary: TemplateRef<any>) {
    this.selectedSummary = summary;
  }
}
