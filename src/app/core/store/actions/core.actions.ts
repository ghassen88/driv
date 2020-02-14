import { Action } from '@ngrx/store';
import { BordersState } from '../reducers/core.reducer';
import { ShortGroup } from '../../models/Group';
import { ShortManager } from '../../models/manager';

export enum CoreActionTypes {
  LoadBorders = '[Core] Load manager and groups',
  LoadBordersSuccess = '[Core] Load manager and groups success',
  LoadGroup = '[Core] Load group by name',
  UpdateHeader = '[Core] Update header',
  AddGroup = '[Core] Add group'  
}

export class LoadBorders implements Action {
  readonly type = CoreActionTypes.LoadBorders;
  constructor(){
  }
}
export class LoadBordersSuccess implements Action {
  readonly type = CoreActionTypes.LoadBordersSuccess;
  constructor(public groups: ShortGroup[]){}
}
export class LoadGroup implements Action{
  readonly type = CoreActionTypes.LoadGroup;
  constructor(public groupName:string){}
}
export class UpdateHeader implements Action {
  readonly type = CoreActionTypes.UpdateHeader;
  constructor(public headerTitle:string){}
}
export class AddGroup implements Action{
  readonly type = CoreActionTypes.AddGroup;
  constructor(public group:ShortGroup){}
}


export type CoreActions = 
LoadBorders | 
LoadBordersSuccess |
LoadGroup |
UpdateHeader |
AddGroup;
