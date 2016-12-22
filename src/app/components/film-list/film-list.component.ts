import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SearchQuery } from "../../reducers/films.reducer";

@Component({
  selector: 'film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent {
  constructor() { }

  @Input()
  list: any[];

  @Input()
  lastQuery: SearchQuery;

  @Input()
  isLoading: Boolean;

  @Output()
  onLoadMore: EventEmitter<any> = new EventEmitter();

  loadMore(): void {
    this.onLoadMore.emit();
  }

  getBackgroundImageUrl(value: string): string {
      return `url(${value})`;
  }

}
