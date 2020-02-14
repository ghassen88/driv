import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { AcceuilActionTypes, AcceuilActions } from '../actions/dashboard.actions';



@Injectable()
export class AcceuilEffects {


  @Effect()
  loadAcceuils$ = this.actions$.pipe(
    ofType(AcceuilActionTypes.LoadAcceuils),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<AcceuilActions>) {}

}
