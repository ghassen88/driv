import { Component, OnInit, Input } from '@angular/core';
import { DriverGroupResult } from '../../models/driverGroupResult';

@Component({
  selector: 'drivata-driver-results',
  templateUrl: './driver-results.component.html',
  styleUrls: ['./driver-results.component.scss']
})
export class DriverResultsComponent implements OnInit {

  @Input() driverResult : DriverGroupResult;
  constructor() { }

  ngOnInit() {
  }

}
