import { Component, Input, OnInit} from '@angular/core';

import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.scss']
})
export class MovesListComponent implements OnInit {

  @Input()
  moves: any[];

  moveMap: {};
  activeMovelist = 'level-up';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.moveMap = this.sortMoves(this.moves);
  }

  setActiveMovelist(list: string) {
    if (this.activeMovelist === list) {
      return;
    }

    this.activeMovelist = list;
  }

  toggleMoveDetail(event: Event, moveUrl: string, index: number) {
    const currentMove = this.moveMap[this.activeMovelist][index];
    const currentMoveDetails = currentMove['app-move-details'];
    const moveNameEl: HTMLSpanElement = <HTMLSpanElement> event.srcElement;

    moveNameEl.classList.toggle('active');

    // don't make api call if .active is not there
    // or if we already have the move details
    if (currentMoveDetails || !moveNameEl.classList.contains('active')) {
      return;
    }

    this.api
      .get(moveUrl)
      .subscribe(res => {
        currentMove['app-move-details'] = res;
        console.log(res);
      });
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
