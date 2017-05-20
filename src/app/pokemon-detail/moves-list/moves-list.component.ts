import { Component, Input, OnInit} from '@angular/core';

import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.scss']
})
export class MovesListComponent implements OnInit {
  constructor(private api: ApiService) {}

  @Input()
  moves: any[];

  moveMap: {};
  activeMovelist = 'level-up';

  ngOnInit() {
    this.moveMap = this.sortMoves(this.moves);
    console.log(this.moveMap);
  }

  setActiveMovelist(list: string) {
    if (this.activeMovelist === list) {
      return;
    }

    this.activeMovelist = list;
  }

  toggleMoveDetail(event: Event, moveUrl: string) {
    event.srcElement.classList.toggle('active');

    this.api
      .get(moveUrl)
      .subscribe(res => {
        console.log(res);
      });
    // when user clicks..
    // activate clicked move
    // get that move's data
    // rotate arrow down
    // expand move row
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
