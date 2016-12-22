import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MdlModule } from 'angular2-mdl';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import 'rxjs/Rx';

import { FilmsEffects } from './effects/films.effects';
import { rootReducer } from './reducers';

import { AppComponent } from './app.component';
import { RatingComponent } from './components/rating/rating.component';
import { MovieListPageComponent } from './components/movie-list-page/movie-list-page.component';

import { DataService } from './shared/services/data.service';
import { PosterPipe } from './shared/pipes/poster.pipe';
import { FilmListComponent } from './components/film-list/film-list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';

const appRoutes: Routes = [
  { path: 'movie-list', component: MovieListPageComponent },
  { path: 'film/:id', component: FilmDetailComponent },
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
    FilmListComponent,
    FilmDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdlModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.provideStore(rootReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(FilmsEffects)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
