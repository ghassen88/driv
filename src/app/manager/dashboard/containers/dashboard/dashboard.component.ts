import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { BordersState } from 'src/app/core/store/reducers/core.reducer';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { selectFirstGroup, selectGroups, GetSelectedGroup } from 'src/app/core/store/selectors/core.selector';
import { Driver } from 'src/app/shared/models/driver';
import { Observable } from 'rxjs';
import { ShortGroup } from 'src/app/core/models/Group';
import { LoadGroup, UpdateHeader } from 'src/app/core/store/actions/core.actions';
import { GroupStat } from '../../models/group.stat';
import { GroupSummary } from '../../models/group.summary';

@Component({
  selector: 'drivata-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  groupName: string;
  group: ShortGroup;
  drivers$: Observable<any[]>;
  groupStat$: Observable<GroupStat>;
  groupSummaries$: Observable<GroupSummary[]>;
  driverCount$: Observable<number>;
  dailyUpdate = 2;

  @ViewChild('MembresSummary', null)
  private defaultSummary: TemplateRef<any>;
  selectedSummary: TemplateRef<any>
  constructor(private bordersStore: Store<BordersState>,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router) {

    this.route.params.subscribe((params = {}) => {
      this.groupName = this.route.snapshot.params.GroupName;

      this.bordersStore.select(selectGroups).subscribe(res => {
        this.bordersStore.dispatch(new LoadGroup(this.groupName));
      })
    });
  }

  ngOnInit() {
    if (this.router.url.includes("/dashboard")) {
      this.bordersStore.select(GetSelectedGroup).subscribe(res => {
        if (res != null) {

          this.group = res;
          let element = document.getElementById('group-icon');
          element.className = this.CheckForDefaultGroup(this.group.name) ? this.group.name.toLowerCase() + '-face-icon' : '';
          this.bordersStore.dispatch(new UpdateHeader(res.name));
          //this.groupStat$ = this.dashboardService.GetGroupStat(this.group.groupId);
          this.dashboardService.GetGroupSummary(this.group.groupId);
          this.dashboardService.GetDriversByGroupId(this.group.groupId);
          this.dashboardService.GetGroupStat(this.group.groupId);
          this.groupSummaries$ = this.dashboardService.groupSummariesObservable;
          this.groupStat$ = this.dashboardService.groupStatObservable;
          this.drivers$ = this.dashboardService.driversObservable;
          this.selectedSummary = this.defaultSummary;
          this.driverCount$ = this.dashboardService.driverCountObservable;

        }
      });
    }
  }
  Show(summary: TemplateRef<any>) {
    this.selectedSummary = summary;
  }
  CheckForDefaultGroup(groupName: string) {
    return ['Excellent', 'Good', 'Feeble'].includes(groupName)
  }


}
