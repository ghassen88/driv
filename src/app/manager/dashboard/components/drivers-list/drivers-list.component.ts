import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Driver } from 'src/app/shared/models/driver';
import { DriverState } from 'src/app/shared/enums/driverState';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DriversService } from 'src/app/manager/drivers/services/drivers.service';
import { InviteDriverComponent } from 'src/app/shared/components/invite-driver/invite-driver.component';
import { InvitedDriver } from 'src/app/manager/drivers/models/invitedDriver';


@Component({
  selector: 'drivata-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DriversListComponent implements OnInit, OnChanges {


  @Input() drivers: Driver[];
  @Output() loadMore = new EventEmitter<any>();
  @Input() driverCount: number;
  showedDrivers: Driver[] = [];
  filteredDriver: Driver[] = [];
  rowCounts = [10, 20, 50];
  filterState = DriverState.all;
  searchValue = '';
  rowCount = 10;
  page = 1;
  columnsNames = ['First name', 'Last name', 'Nickname', 'Eco driving', 'Security', 'Phone usage',
    'Trips', 'Distance', 'Duration', 'First trip', 'Last trip'];
  driverAttributes = ['firstName', 'lastName', 'nickname', 'ecoDriving', 'security', 'distraction', 'tripCount', 'distance', 'duration', 'firstTrip', 'lastTrip'];
  sortedColumn: string;
  sortAscend = false;
  // view = new Array<boolean>(11).fill(true);
  view = [true, true, false, true, true, false, true, false, false, true]
  constructor(
    private modal: NgbModal,
    private driverService: DriversService,
    private router: Router) {

    // if (translate.getBrowserLang())
    //   translate.use(translate.getBrowserLang());
    // else translate.use('en');
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.drivers) {
      this.filteredDriver = this.drivers;
      this.showedDrivers = this.filteredDriver.slice((this.page * this.rowCount) - this.rowCount, this.page * this.rowCount);
    }
  }


  onResized(value) {
  }
  Sort(value: string) {
    if (this.searchValue != '')
      this.filteredDriver = this.drivers.filter(d => d.firstName.toLowerCase().includes(this.searchValue) || d.lastName.toLowerCase().includes(this.searchValue) || d.nickname.toLowerCase().includes(this.searchValue));
    if (this.sortedColumn != value)
      this.sortAscend = false;
    else
      this.sortAscend = !this.sortAscend;
    this.sortedColumn = value;
    this.filteredDriver.sort((d1, d2) => {
      let at1 = d1[Object.keys(d1).find(a1 => a1 == value)];
      let at2 = d2[Object.keys(d2).find(a2 => a2 == value)];
      if (typeof (at1) == 'string') {
        at1 = at1.toLowerCase();
        at2 = at2.toLowerCase();
      }
      if (at1 > at2)
        if (this.sortAscend)
          return -1;
        else return 1;
      else if (at1 < at2)
        if (this.sortAscend)
          return 1;
        else return -1;
      else return 0;
    });
    this.showedDrivers = this.filteredDriver.slice((this.page * this.rowCount) - this.rowCount, this.page * this.rowCount);
  }
  Show() {
    if (this.rowCount <= this.driverCount)
      this.showedDrivers = this.filteredDriver.slice((this.page * this.rowCount) - this.rowCount, this.page * this.rowCount);
    else
      this.showedDrivers = this.filteredDriver.slice(0, this.page * this.driverCount);
  }
  Filter(state: number) {
    this.sortedColumn = '';
    if (this.searchValue != '')
      this.filteredDriver = this.drivers.filter(d => d.firstName.toLowerCase().includes(this.searchValue) || d.lastName.toLowerCase().includes(this.searchValue) || d.nickname.toLowerCase().includes(this.searchValue));

    this.filterState = DriverState[DriverState[state]];
    let currentDate = new Date();

    switch (this.filterState) {
      case DriverState.all:
        this.filteredDriver = this.drivers;
        break;
      case DriverState.actif:
        currentDate.setMonth(currentDate.getMonth() - 1);
        this.filteredDriver = this.drivers.filter(d => new Date(d.lastTrip) >= currentDate)
        break;
      case DriverState.inactif:
        currentDate.setMonth(currentDate.getMonth() - 1);
        this.filteredDriver = this.drivers.filter(d => new Date(d.lastTrip) <= currentDate);
        break;
      case DriverState.followed:
        this.filteredDriver = this.drivers.filter(d => d.ecoDriving < 7);
        break;
      case DriverState.good:
        this.filteredDriver = this.drivers.filter(d => d.ecoDriving > 7 && d.ecoDriving < 9);
        break;
      case DriverState.excelent:
        this.filteredDriver = this.drivers.filter(d => d.ecoDriving > 9);
        break;
      default:
        break;
    }
    this.showedDrivers = this.filteredDriver.slice((this.page * this.rowCount) - this.rowCount, this.page * this.rowCount);

  }
  onSearchChange(searchValue: string) {
    this.searchValue = searchValue
    this.filteredDriver = this.drivers.filter(d => d.firstName.toLowerCase().includes(searchValue) || d.lastName.toLowerCase().includes(searchValue) || d.nickname.toLowerCase().includes(searchValue));
    this.showedDrivers = this.filteredDriver.slice((this.page * this.rowCount) - this.rowCount, this.page * this.rowCount);

  }
  InviteDriver() {
    const modalref = this.modal.open(InviteDriverComponent, { windowClass: 'invite-driver-modal' });
    modalref.result.then((driver: InvitedDriver[]) => {
      this.driverService.InviteDriver(driver).subscribe((res: Driver[]) => { this.drivers.concat(res) }, () => { })
    }, () => { })
  }
  ShowDriverStat(value) {
    this.router.navigate(['manager/driver', value])
  }
  LoadPage(value: number, isMoving?: boolean,direction?:string) {
      let authorised = true;
      if(direction == 'backward' && this.page == 1)
        authorised = false;
      
      if(direction == 'forward' && this.page == this.driverCount / this.rowCount)
        authorised = false;
      if(authorised){
      if (isMoving)
        this.page += value;
      else
        this.page = value;
      this.showedDrivers = this.filteredDriver.slice((this.page * this.rowCount) - this.rowCount, this.page * this.rowCount);
      }
  }
  GetPageCount() {
    return Math.ceil(this.driverCount / this.rowCount);
  }


}
