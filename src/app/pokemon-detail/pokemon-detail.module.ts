import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { PokemonDetailComponent } from './pokemon-detail.component';
import { PokemonResolver } from './pokemon-resolver';

import { PokemonStatPipe } from '../shared/pokemon-stats.pipe';
import { StatMeterComponent } from './stat-meter.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: PokemonDetailComponent,
      resolve: {
        pokemon: PokemonResolver
      }
    }])
  ],
  declarations: [
    PokemonDetailComponent,
    PokemonStatPipe,
    StatMeterComponent
  ],
  providers: [PokemonResolver]
})
export class PokemonDetailModule {

}
