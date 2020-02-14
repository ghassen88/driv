import { v4 as uuid } from 'uuid';
import { Context } from 'src/app/shared/enums/context';

export class GroupSummary{
    week: Date;
    excelentCount: number;
    goodCount: number;
    followedCount: number;
    inactiveCount: number;
    teamId: uuid;
    groupId: uuid;
    contextSummaries: ContextSummary[];
}
export class ContextSummary{
    contextId: Context;
    ecoDrivingScore: number;
    safetyScore: number;
    distractionScore:number;
    accelScore: number;
    accelCritiCount: number;
    harshBrakingCount: number;
    adherenceThresholdCrossingCount:number;
    consumption: number;
    co2Mass: number;
    averageFuelConsumtion: number;
    idealConsumtion: number;
    idealCO2Mass: number;
    cO2Emission: number;
    achievableFuelSaving:number;
    achievableCO2Saving:number;
    tripCount: number;
    distanceTraveled: number;
    drivingDuration:number;
}