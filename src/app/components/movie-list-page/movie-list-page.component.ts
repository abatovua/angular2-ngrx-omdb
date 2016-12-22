import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Observable } from "rxjs/Observable";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'movie-list-page',
  templateUrl: 'movie-list-page.component.html',
  styleUrls: [ 'movie-list-page.component.scss' ]
})
export class MovieListPageComponent implements OnInit, OnDestroy {
  model: any;
  modelSub: Subscription;
  searchForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private DataService: DataService,
    private fb: FormBuilder
  ) {
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

  ngOnInit() {
    this.searchForm = this.fb.group({
      query: [this.model.lastQuery.query, Validators.required]
    });
  }

  ngOnDestroy() {
    this.modelSub.unsubscribe();
  }

  loadFilms() {
    this.DataService.initialLoad(this.searchForm.value.query);
  }

  loadMore() {
    this.DataService.loadMore();
  }
}
