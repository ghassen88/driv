
import { AcceuilActions, AcceuilActionTypes } from '../actions/dashboard.actions';

export const acceuilFeatureKey = 'acceuil';

export interface State {
  
}

export const initialState: State = {

};

export function reducer(state = initialState, action: AcceuilActions): State {
  switch (action.type) {

    case AcceuilActionTypes.LoadAcceuils:
      return state;

    default:
      return state;
  }
}
