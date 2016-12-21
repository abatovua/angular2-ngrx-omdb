import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs";
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'movie-list-page',
  templateUrl: 'movie-list-page.component.html',
  styleUrls: [ 'movie-list-page.component.scss' ]
})
export class MovieListPageComponent implements OnDestroy {
  model: any;
  modelSub: Subscription;

  constructor(private store: Store<AppState>, private DataService: DataService) {
    this.modelSub = Observable.combineLatest(
      store.select('films'),
      (films) => {
        let { list, isLoading, loadingError, lastQuery } = films;
        return {
          list,
          isLoading,
          loadingError,
          lastQuery
        };
      }
    ).subscribe(model => {
      this.model = model;
    })
  }

  ngOnDestroy() {
    this.modelSub.unsubscribe();
  }

  loadFilms() {
    this.DataService.initialLoad(this.model.lastQuery.query);
  }

  loadMore() {
    this.DataService.loadMore();
  }
}
