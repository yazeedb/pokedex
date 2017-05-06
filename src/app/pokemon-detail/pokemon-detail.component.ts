import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.activatedRoute
      .params
      .subscribe(params => {
        this.api
          .get('http://pokeapi.co/api/v2/pokemon/' + params.pokemon)
          .subscribe(res => console.log(res));
      });
  }
}
