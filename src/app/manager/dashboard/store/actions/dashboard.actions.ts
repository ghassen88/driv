import { Action } from '@ngrx/store';

export enum AcceuilActionTypes {
  LoadAcceuils = '[Acceuil] Load Acceuils',
  
  
}

export class LoadAcceuils implements Action {
  readonly type = AcceuilActionTypes.LoadAcceuils;
}


export type AcceuilActions = LoadAcceuils;
