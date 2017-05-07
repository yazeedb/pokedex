import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ApiService } from '../shared/api.service';

@Injectable()
export class PokemonResolver implements Resolve<any> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
    return this.api.get('http://pokeapi.co/api/v2/pokemon/' + route.params.pokemon);
  }
}
