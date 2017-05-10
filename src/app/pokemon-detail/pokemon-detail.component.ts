import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  species: any;

  constructor(private route: ActivatedRoute) {
    this.pokemon = this.route.snapshot.data.pokemon[0];
    this.species = this.route.snapshot.data.pokemon[1];
  }

  ngOnInit() {
    console.log(this.pokemon);
    console.log(this.species);
  }
}
