import { Action } from '@ngrx/store';
import { Driver } from 'src/app/shared/models/driver';

export enum DriversActionsTypes {
    chargerDrivers = "[Drivers] charger Drivers ",
    chargerDriversSucces = "[Drivers] charger Drivers avec succes ",
    chargerDriver = "[Drivers] charger Driver avec id",
    chargerDriverSucces = "[Drivers] charger Driver avec id avec succes"
}
export class ChargerDrivers implements Action{
    readonly type = DriversActionsTypes.chargerDrivers;
}
export class ChargerDriversSucces  implements Action {
    readonly type = DriversActionsTypes.chargerDriversSucces;
    constructor(public drivers: Driver[]){}
}
export class ChargerDriver implements Action {
    readonly type = DriversActionsTypes.chargerDriver;
    constructor(public id: number){}
}
export class ChargerDriverSucces implements Action{
    readonly type = DriversActionsTypes.chargerDriverSucces;
    constructor(public driver: Driver){}
}
export type DriversActions = 
    ChargerDriver | 
    ChargerDriverSucces | 
    ChargerDrivers | 
    ChargerDriversSucces