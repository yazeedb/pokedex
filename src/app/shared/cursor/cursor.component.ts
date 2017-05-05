import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.scss']
})
export class CursorComponent implements OnInit {
  private keyMap = {
    ArrowUp: true,
    ArrowDown: true,
    ArrowLeft: true,
    ArrowRight: true
  };

  ngOnInit() {
    Observable
      .fromEvent(document, 'keydown')
      .map((e: KeyboardEvent) => e.key)
      .filter((key => this.keyMap[key]))
      .subscribe(key => console.log(key));
  }
}
