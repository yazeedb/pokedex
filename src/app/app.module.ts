import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { CursorComponent } from './shared/cursor/cursor.component';
import { HomeComponent } from './home/home.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

import { PokemonListService } from './pokemon-list/pokemon-list.service';

@NgModule({
  declarations: [
    AppComponent,
    CursorComponent,
    HomeComponent,
    PokemonListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,

    RouterModule.forRoot([{
      path: '',
      pathMatch: 'full',
      component: HomeComponent
    }, {
      path: ':pokemon',
      pathMatch: 'full',
      loadChildren: './pokemon-detail/pokemon-detail.module#PokemonDetailModule',
    }])
  ],
  providers: [PokemonListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
