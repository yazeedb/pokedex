import { Component, Input, OnInit} from '@angular/core';

import { ApiService } from '../../shared/api.service';
import { MovesListService } from './moves-list.service';

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

  constructor(private api: ApiService, private movesListService: MovesListService) {}

  ngOnInit() {
    this.moveMap = this.sortMoves(this.moves);
    console.log(this.moveMap);
  }

  getMoveDetail(event: Event, moveUrl: string, index: number) {
    const target = <HTMLElement> event.target;
    const moveDetail = <HTMLElement> target.querySelector('.move-details');

    if (target.classList.contains('active')) {
      target.classList.remove('active');
      this.movesListService.closeDropdown(moveDetail);
    } else {
      target.classList.add('active');
      this.movesListService.openDropdown(moveDetail);
    }

    this.api
      .get(moveUrl)
      .subscribe(res => {
        const currentMove = this.moveMap[this.activeMovelist][index];
        currentMove.moveDetails = res;
        console.log(currentMove);
      });
  }

  setActiveMovelist(list: string) {
    if (this.activeMovelist === list) {
      return;
    }

    this.activeMovelist = list;
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
