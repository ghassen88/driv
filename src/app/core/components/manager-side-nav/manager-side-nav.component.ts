import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BordersState } from '../../store/reducers/core.reducer';
import { Store } from '@ngrx/store';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { LoadBorders, LoadGroup } from '../../store/actions/core.actions';
import { Observable } from 'rxjs';
import { ShortGroup } from '../../models/Group';
import { selectGroups, GetSelectedGroup } from '../../store/selectors/core.selector';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CoreService } from '../../services/core.service';
import { DriverName } from 'src/app/manager/drivers/models/driverTrip';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'drivata-manager-side-nav',
  templateUrl: './manager-side-nav.component.html',
  styleUrls: ['./manager-side-nav.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class ManagerSideNavComponent implements OnInit, OnChanges {

  selectedTab = 'Groups'
  selectedGroup: any;
  firstDriver = new DriverName();
  teamName: string;
  isPremium = false;
  showCustomGroups = false;

  @Input() groups: ShortGroup[] = [];
  customGroups: ShortGroup[] = [];
  constructor(private bordersStore: Store<BordersState>,
    private router: Router,
    private route: ActivatedRoute,
    private coreService: CoreService) {
    // var teamId = localStorage.getItem("TeamId");
    // if(!teamId)
    //             this.router.navigate(["/login"]);
    // else{
    //}
  }

  ngOnInit() {
    this.teamName = localStorage.getItem("TeamName");
    this.isPremium = localStorage.getItem("Role") == environment.roles.premium;
    this.bordersStore.select(GetSelectedGroup).subscribe(res => {
      if (res != null) {
        this.selectedGroup = res;
        this.coreService.GetDriver(this.selectedGroup.groupId).subscribe(res => {
          this.firstDriver = res[0];
        })
      }
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.groups != null && this.groups.length != 0) {
      if (this.router.url == "/manager"){
        this.router.navigate([`dashboard`, this.groups[0].name], { relativeTo: this.route });
      this.bordersStore.dispatch(new LoadGroup(this.groups[0].name));
      }
      if(this.isPremium){
        this.customGroups = this.groups.slice(3);
        console.log(this.customGroups);
      }

    }
  }
  UpdateHeader(value: string) { }
  LoadCarto() {
    this.coreService.GetDriver(this.selectedGroup.groupId).subscribe(res => {
      this.router.navigate(['manager/driver', res[0].driverId]);
    })
  }
  Show(tab:string){
    this.selectedTab = tab;
  }
}
