import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import { DataService } from '../shared/services/data.service';
import * as ActionTypes from '../actions/types';
import * as filmsActions from '../actions/films.actions';

@Injectable()
export class FilmsEffects {
  constructor(
    private actions$: Actions,
    private DataService: DataService
  ) { }


  @Effect() initialLoading$: Observable<Action> = this.actions$
    .ofType(ActionTypes.INITIAL_LOAD_REQUEST)
    .switchMap(() => {
      return this.DataService.loadFilms()
        .map((data) => {
          if (data.Response === 'True') {
            let pages: number = Math.ceil(data.totalResults / 10);
            return filmsActions.initialLoadSuccess(data.Search, pages);
          }
          if (data.Response === 'False') {
            return filmsActions.initialLoadError();
          }
        })
        .catch(err => Observable.of(filmsActions.initialLoadError()));
    });

  @Effect() loadMore$: Observable<Action> = this.actions$
    .ofType(ActionTypes.LOAD_MORE_REQUEST)
    .switchMap(() => {
      return this.DataService.loadFilms()
        .map((data) => {
          if (data.Response === 'True') {
            return filmsActions.loadMoreSuccess(data.Search);
          }
        })
        .catch(err => Observable.of(filmsActions.loadMoreError()));
    });
}