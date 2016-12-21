import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import 'hammerjs';
import 'rxjs/Rx';

import { FilmsEffects } from './effects/films.effects';
import { rootReducer } from './reducers';

import { AppComponent } from './app.component';
import { RatingComponent } from './components/rating/rating.component';
import { MovieListPageComponent } from './components/movie-list-page/movie-list-page.component';

import { DataService } from './shared/services/data.service';
import { PosterPipe } from './shared/pipes/poster.pipe';
import { FilmListComponent } from './components/film-list/film-list.component';

const appRoutes: Routes = [
  { path: 'movie-list', component: MovieListPageComponent },
  {
    path: '',
    redirectTo: '/movie-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/movie-list',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RatingComponent,
    MovieListPageComponent,
    PosterPipe,
    FilmListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    StoreModule.provideStore(rootReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(FilmsEffects)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
