import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import * as filmsActions from '../../actions/films.actions';
import { Observable } from "rxjs";
import { SearchQuery, State } from "../../reducers/films.reducer";

@Injectable()
export class DataService {
  private baseUrl = `http://www.omdbapi.com/?s=`;
  private _lastQuery: SearchQuery;

  constructor(private store: Store<AppState>, private http: Http) {
    store.select('films')
      .subscribe((films: State) => {
        this._lastQuery = films.lastQuery;
      });
  }

  initialLoad(query: string): void {
    this.store.dispatch(filmsActions.initialLoadRequest(query));
  }

  loadMore(): void {
    this.store.dispatch(filmsActions.loadMoreRequest());
  }

  loadFilms(): Observable<any> {
    let nextPage = this._lastQuery.loaded + 1;
    let url = `${this.baseUrl}${this._lastQuery.query}&page=${nextPage}`;

    return this.http.get(url)
      .map(res => res.json());
  }
}
