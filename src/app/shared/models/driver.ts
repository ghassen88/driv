import { v4 as uuid } from 'uuid';
import { DriverState } from '../enums/driverState';

export class Driver {
    driverId: uuid;
    firstName: string;
    lastName: string;
    nickname: string;
    map: boolean;
    subscriptionDate: string;
    ecoDriving: number;
    security: number;
    distraction: number;
    tripCount: number;
    distance: number;
    duration: number;
    firstTrip: Date;
    lastTrip: Date;
    status: DriverState;
    speeding: number;
    level: any;
    fuelVolume: number;
    co2Mass: number;
    co2MassOptimal: number;
    invited:boolean;

}