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
  moves: any = {};
  pokemon: any;
  species: any;

  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.pokemon = this.route.snapshot.data.pokemon[0];
    this.species = this.route.snapshot.data.pokemon[1];
  }

  ngOnInit() {
    this.moves = this.sortMoves(this.pokemon.moves);
    console.log(this.moves);

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

  private sortMoves(moves: any[]) {
    const moveMap = {};

    moves.forEach(m => {
      const learnMethod = m.version_group_details[0].move_learn_method.name;

      if (moveMap[learnMethod]) {
        moveMap[learnMethod].push(m);
      } else {
        moveMap[learnMethod] = [m];
      }
    });

    return moveMap;
  }
}
