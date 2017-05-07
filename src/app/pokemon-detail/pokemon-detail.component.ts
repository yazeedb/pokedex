import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;

  constructor(private route: ActivatedRoute) {
    this.pokemon = this.route.snapshot.data.pokemon;
  }

  ngOnInit() {
    console.log(this.pokemon);
  }
}
