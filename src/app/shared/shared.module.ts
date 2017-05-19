import { NgModule } from '@angular/core';

import { ApiService } from './api.service';
import { CacheService } from './cache.service';
import { PokemonIdPipe } from '../pokemon-list/pokemon-id.pipe';

@NgModule({
  declarations: [PokemonIdPipe],
  exports: [PokemonIdPipe],
  providers: [
    ApiService,
    CacheService
  ]
})
export class SharedModule {

}
