import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  evolution: any;
  pokemon: any;
  species: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.pokemon = this.route.snapshot.data.pokemon[0];
    this.species = this.route.snapshot.data.pokemon[1];
  }

  ngOnInit() {
    console.log(this.pokemon);
    console.log(this.species);
    this.api
      .get(this.species.evolution_chain.url)
      .subscribe(res => console.log(res));
  }

  getTotalStats() {
    let total = 0;

    this.pokemon
      .stats
      .forEach(s => total += s.base_stat);

     return total;
  }

  getPkmnIdFromUrl(url: string) {
    return url.match(/\d/g)
      .splice(1, url.length)
      .join('');
  }
}
