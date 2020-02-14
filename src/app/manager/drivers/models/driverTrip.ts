import { v4 as uuid } from 'uuid';
import { Context } from 'src/app/shared/enums/context';
import { Weather } from 'src/app/shared/enums/weather';

export class DriverTrip {
    tripId: uuid;
    startDate: Date;
    endDate: Date;
    startAddress: string;
    arrivalAddress: string;
    tripDuration:number;
    distance: number;
    safetyScore: number;
}
export class TripDetail extends DriverTrip{
    drivingDuration: number;
    meanSpeed: number;
    idleDuration:number;
    accelScore:number;
    deccelScore:number;
    safetyScore:number;
    unlockCount:number;
    screenOnDuration: number;
    screenOnDistance: number;
    distractionScore:number;
    weather: Weather;
    isDayTime:boolean;
    cords: TripCord[];
    safetyEvents: SafetyEvent[];
    contextsDiffusion: ContextDiffusion[];
}
export class TripCord{
    latitude: number;
    longtitude:number;
}
export class ContextDiffusion{
    contextId: Context;
    percentage: number;
}
export class SafetyEvent extends TripCord{
    level: number;
    type:number;
}
export class DriverName{
    driverId: uuid;
    nickName: string;
    constructor(){
        this.nickName = '';
        this.driverId = new uuid();
    }
}