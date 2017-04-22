import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private previousUrl: string;
  private nextUrl: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api
      .get('http://pokeapi.co/api/v2/pokemon/?limit=20')
      .subscribe(res => {
        this.previousUrl = res.previous;
        this.nextUrl = res.next;

        console.log(res);
      });
  }

}
