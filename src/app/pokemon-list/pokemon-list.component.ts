import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { ApiService } from '../shared/api.service';
import { PokemonListService } from './pokemon-list.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemon: any[];
  activePokemon = 0;

  private previousUrl: string;
  private nextUrl: string;

  constructor(private api: ApiService, private pokemonListService: PokemonListService) { }

  ngOnInit() {
    this.api
      .get('http://pokeapi.co/api/v2/pokemon/?limit=100')
      .subscribe(res => {
        this.previousUrl = res.previous;
        this.nextUrl = res.next;

        this.pokemon = res.results;
        console.log(this.pokemon);

        Observable
          .fromEvent(document, 'keydown')
          .map((e: KeyboardEvent) => e.key)
          .map(key => this.pokemonListService.mapKeyEvent(key))
          .filter(num => this.validateNewIndex(num))
          .subscribe(num => this.stepActivePokemon(num));
      });
  }

  setActivePokemon(index: number) {
    this.activePokemon = index;
  }

  stepActivePokemon(stepAmount: number) {
    this.activePokemon += stepAmount;
  }

  private validateNewIndex(index: number) {
    const potentialValue = this.activePokemon + index;
    const lastIndex = this.pokemon.length - 1;

    if (potentialValue < 0) {
      this.setActivePokemon(0);
      return;
    } else if (potentialValue > lastIndex) {
      this.setActivePokemon(lastIndex);
      return;
    }

    return true;
  }
}
