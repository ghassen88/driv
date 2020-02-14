import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DriversState, selectAll } from '../reducers/drivers-reducer';

export const selectDriversState = createFeatureSelector<DriversState>('drivers');
export const selectAllLeads = createSelector(selectDriversState, selectAll);

