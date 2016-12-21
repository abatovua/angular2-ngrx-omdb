import { ActionReducer, Action } from '@ngrx/store';
import * as ActionTypes from '../actions/types';

export class SearchQuery {
  query: string;
  pages: number;
  loaded: number;
  constructor(query, pages, loaded) {
    this.query = query;
    this.pages = pages;
    this.loaded = loaded;
  }
}

export interface State {
  list: any[],
  isLoading: Boolean,
  loadingError: Boolean,
  lastQuery: SearchQuery
}

const initialState: State = {
  list: [],
  isLoading: false,
  loadingError: false,
  lastQuery: new SearchQuery('', 0, 0)
};

export const filmsReducer: ActionReducer<State> = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.INITIAL_LOAD_REQUEST:
      return Object.assign({}, state,
        {
          isLoading: true,
          lastQuery: new SearchQuery(action.payload, 0, 0)
        }
      );

    case ActionTypes.INITIAL_LOAD_SUCCESS:
      return Object.assign({}, state,
        {
          isLoading: false,
          list: [...action.payload.data],
          lastQuery: Object.assign({}, state.lastQuery, { pages: action.payload.pages, loaded: 1 })
        }
      );

    case ActionTypes.INITIAL_LOAD_ERROR:
      return Object.assign({}, state, { loadingError: true });

    case ActionTypes.LOAD_MORE_REQUEST:
      return Object.assign({}, state,
        {
          isLoading: true
        }
      );

    case ActionTypes.LOAD_MORE_SUCCESS:
      return Object.assign({}, state,
        {
          isLoading: false,
          list: [...state.list, ...action.payload],
          lastQuery: Object.assign({}, state.lastQuery, { loaded: state.lastQuery.loaded + 1 })
        }
      );

    default:
      return state;
  }
};