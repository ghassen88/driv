import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShortGroup } from 'src/app/core/models/Group';
import { selectGroups, selectHeader } from 'src/app/core/store/selectors/core.selector';
import { Store } from '@ngrx/store';
import { BordersState } from 'src/app/core/store/reducers/core.reducer';
import { Router } from '@angular/router';
import { LoadBorders } from 'src/app/core/store/actions/core.actions';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'drivata-manager-interface',
  templateUrl: './manager-interface.component.html',
  styleUrls: ['./manager-interface.component.scss']
})
export class ManagerInterfaceComponent implements OnInit {
  title = 'Drivata-Analytics';
  userNav: boolean;
  groups$: Observable<ShortGroup[]>;
  user;
  toggled = false;
  fullscreen = false;

  constructor(private bordersStore: Store<BordersState>,
                  private router: Router,
    ) {
      this.bordersStore.dispatch(new LoadBorders());

    }

  ngOnInit() {
    this.toggled = window.innerWidth <= 820 ? true : false;
    this.fullscreen = window.innerWidth > 820 ? true : false;
    this.groups$ = this.bordersStore.select(selectGroups);
  }
  showUser(value:boolean){
    this.userNav = value;
  }
  onResized(event){
    let witdh = event.target.innerWidth;
    this.toggled = witdh <= 820 ? true : false;
    this.fullscreen = window.innerWidth > 820 ? true : false;

  }
  CheckDisplay(){
    if(!this.fullscreen)
    this.toggled = true;
  }

}
