import { Component, OnInit } from '@angular/core';

import { ApiService } from '../shared/api.service';

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

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api
      .get('http://pokeapi.co/api/v2/pokemon/?limit=20')
      .subscribe(res => {
        this.previousUrl = res.previous;
        this.nextUrl = res.next;

        this.pokemon = res.results;
        console.log(this.pokemon);
      });
  }

  setActive(index: number) {
    this.activePokemon = index;
  }
}
