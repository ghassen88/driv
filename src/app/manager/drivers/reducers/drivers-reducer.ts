import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { DriversActions, DriversActionsTypes } from '../actions/drivers.action';
import { Driver } from 'src/app/shared/models/driver';
export interface DriversState extends EntityState<Driver> {

}
export const adapter: EntityAdapter<Driver> = createEntityAdapter<Driver>();
export const initialDriversState: DriversState = adapter.getInitialState();

export function reducer(state = initialDriversState,action: DriversActions){
    switch(action.type){
        case DriversActionsTypes.chargerDriversSucces : {
            return adapter.addAll(action.drivers,state);
        }
        case DriversActionsTypes.chargerDriverSucces : {
            return adapter.upsertOne(action.driver,state);
        }
    }
}
export const{ selectAll } = adapter.getSelectors();


