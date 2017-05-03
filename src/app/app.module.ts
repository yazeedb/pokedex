import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CursorComponent } from './shared/cursor/cursor.component';
import { HomeComponent } from './home/home.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

import { PokemonIdPipe } from './pokemon-list/pokemon-id.pipe';

import { ApiService } from './shared/api.service';
import { CacheService } from './shared/cache.service';

@NgModule({
  declarations: [
    AppComponent,
    CursorComponent,
    HomeComponent,
    PokemonListComponent,

    PokemonIdPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ApiService,
    CacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
