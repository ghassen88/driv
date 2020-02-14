import { Context } from 'src/app/shared/enums/context';
import { ContextSummary } from '../../dashboard/models/group.summary';

export class DriverGroupResult {
    name:string;
    lastTrip: Date;
    ranking: number;
    driverCount: number;
    distance:number;
    lastWeekDistance:number;
    tripCount:number;
    lastWeekTripCount:number;
}
export class DriverGroupScores{
    safetyScore:number;
    ecoDrivingScore:number;
    lastWeekEcoDrivingScore:number;
    lastWeekSafetyScore:number;
    drivingPerContext: ContextStatistics;
}
export class DriverGroupSummary{
    week:Date;
    contextSummaries: ContextSummary[];
}
export class ContextStatistics{
    contextStatisticsValues: ShortContextStatistic[];
}
export class ShortContextStatistic{
    contextId:Context;
    distance:number;
}