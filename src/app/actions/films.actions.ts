import * as ActionTypes from './types';
import { Action } from '@ngrx/store';

export function initialLoadRequest(query: string): Action {
  return {
    type: ActionTypes.INITIAL_LOAD_REQUEST,
    payload: query
  }
}

export function initialLoadSuccess(data, pages): Action {
  return {
    type: ActionTypes.INITIAL_LOAD_SUCCESS,
    payload: {
      data,
      pages
    }
  }
}

export function initialLoadError(): Action {
  return {
    type: ActionTypes.INITIAL_LOAD_ERROR
  }
}

export function loadMoreRequest(): Action {
  return {
    type: ActionTypes.LOAD_MORE_REQUEST
  }
}

export function loadMoreSuccess(data): Action {
  return {
    type: ActionTypes.LOAD_MORE_SUCCESS,
    payload: data
  }
}

export function loadMoreError(): Action {
  return {
    type: ActionTypes.LOAD_MORE_ERROR
  }
}