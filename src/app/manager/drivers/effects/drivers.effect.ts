import { Injectable } from "@angular/core";
import { DriversService } from '../services/drivers.service';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { ChargerDrivers, DriversActionsTypes, ChargerDriversSucces, ChargerDriver, ChargerDriverSucces } from '../actions/drivers.action';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class DriversEffect {
    constructor(private driversService: DriversService,
                private actions$: Actions){}
    // @Effect()
    // chargerDrivers$ = this.actions$.pipe(
    //     ofType<ChargerDrivers>(DriversActionsTypes.chargerDrivers),
    //     mergeMap(action => this.driversService.ChargerDrivers()),
    //     map(result => new ChargerDriversSucces(result))
    // );
    // @Effect()
    // chargerDriver$ = this.actions$.pipe(
    //     ofType<ChargerDriver>(DriversActionsTypes.chargerDriver),
    //     mergeMap(action => this.driversService.ChargerDriver(action.id)),
    //     map(result => new ChargerDriverSucces(result))
    // );
}