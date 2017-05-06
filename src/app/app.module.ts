import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CursorComponent } from './shared/cursor/cursor.component';
import { HomeComponent } from './home/home.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

import { PokemonIdPipe } from './pokemon-list/pokemon-id.pipe';

import { ApiService } from './shared/api.service';
import { CacheService } from './shared/cache.service';
import { PokemonListService } from './pokemon-list/pokemon-list.service';

@NgModule({
  declarations: [
    AppComponent,
    CursorComponent,
    HomeComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonIdPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([{
      path: '',
      pathMatch: 'full',
      component: HomeComponent
    }, {
      path: ':pokemon',
      pathMatch: 'full',
      component: PokemonDetailComponent
    }])
  ],
  providers: [
    ApiService,
    CacheService,
    PokemonListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
