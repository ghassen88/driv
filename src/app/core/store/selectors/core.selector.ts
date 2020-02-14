import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BordersState } from '../reducers/core.reducer';



export const selectBorders = createFeatureSelector<BordersState>('core');
export const selectGroups = createSelector(selectBorders, (BordersState) => BordersState.groups);
export const GetSelectedGroup = createSelector(selectBorders,(BordersState) => BordersState.selected);
export const selectFirstGroup = createSelector(selectBorders,(BorderState) => BorderState.groups[0]);
export const selectHeader = createSelector(selectBorders,(BordersState) => BordersState.selectedNav);
//export const selectGroupByName = (groupName:string) => createSelector(selectBorders,(BorderState) =>  BorderState.groups.find(g => g.groupName == groupName): null)

