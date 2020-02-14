
import { CoreActions, CoreActionTypes } from '../actions/core.actions';
import {  ShortGroup } from '../../models/Group';
import { ShortManager } from '../../models/manager';
import { ShortTeam } from '../../models/team';
import { act } from '@ngrx/effects';
import { v4 as uuid } from 'uuid';

export const coreFeatureKey = 'core';

export interface BordersState {
  groups: ShortGroup[];
  selected:ShortGroup;
  selectedNav:string;

}

export const initialState: BordersState = {
  groups:[],
  selected: null,
  selectedNav:'',
};

export function reducer(state = initialState, action: CoreActions): BordersState {
  switch (action.type) {

    case CoreActionTypes.LoadBordersSuccess:{
      let groups = Object.assign([],action.groups);
      return {...state,groups: action.groups};
    }
    case CoreActionTypes.LoadGroup:{
      const group = state.groups.find(g => g.name == action.groupName);
      if(group){
      return {...state,selected: group,selectedNav: group.name};
      }else 
      return {...state}
    }
    case CoreActionTypes.UpdateHeader:{
      return {...state,selectedNav: action.headerTitle}
    }
    case CoreActionTypes.AddGroup:{
      let groups = Object.assign([],state.groups);
      groups.push(action.group);
      return {...state,groups:groups}
    }
    default:
      return state;
  }
}
