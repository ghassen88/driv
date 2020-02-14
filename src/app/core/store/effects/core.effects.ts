import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { mergeMap, map } from 'rxjs/operators';
import { CoreActionTypes, LoadBordersSuccess, LoadBorders, LoadGroup } from '../actions/core.actions';
import { CoreService } from '../../services/core.service';
import { Store } from '@ngrx/store';
import { BordersState } from '../reducers/core.reducer';
import { DashboardService } from 'src/app/manager/dashboard/services/dashboard.service';



@Injectable()
export class CoreEffects {


  // @Effect()
  // loadCores$ = this.actions$.pipe(
  //   ofType<LoadBorders>(CoreActionTypes.LoadBorders),
  //   mergeMap(action => this.coreService.GetGroups(action.teamId)),
  //   map((res: any) =>  new LoadBordersSuccess(res))
  // );
  LoadBorders$ = createEffect(() => this.actions$.pipe(
      ofType<LoadBorders>(CoreActionTypes.LoadBorders),
      mergeMap(action => this.coreService.GetGroups()),
      map(res => new LoadBordersSuccess(res))
      ));
  // LoadGroup$ = createEffect(() => this.actions$.pipe(
  //   ofType<LoadGroup>(CoreActionTypes.LoadGroup),
  //   mergeMap(action => this.dashboardService.GetDriversByGroupId())
  // ))


  constructor(private actions$: Actions,
              private coreService: CoreService,
              private dashboardService: DashboardService,
              private bordersStore: Store<BordersState>) {}

}
