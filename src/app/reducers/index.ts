import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store';
import { storeLogger } from "ngrx-store-logger";

import * as films from './films.reducer';

export interface AppState {
  counter: films.State
}

const reducers = {
  films: films.filmsReducer
};

export const rootReducer: ActionReducer<AppState> = compose(storeLogger(), combineReducers)(reducers);