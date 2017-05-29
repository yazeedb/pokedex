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
    console.log(this.moveMap);
  }

  getMoveDetail(event: Event, moveUrl: string, index: number) {
    const target = <HTMLElement> event.target;
    const moveDetail = <HTMLElement> target.querySelector('.move-details');

    if (target.classList.contains('active')) {
      target.classList.remove('active');
      this.closeDropdown(moveDetail);
    } else {
      target.classList.add('active');
      this.openDropdown(moveDetail);
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

  private openDropdown(moveDetail: HTMLElement) {
    requestAnimationFrame(() => {
      moveDetail.classList.remove('hidden');
      (<any> moveDetail).style.willChange = 'opacity, transform';
      moveDetail.style.opacity = '0';
      moveDetail.style.transform = 'scaleY(0.01)';

      requestAnimationFrame(() => {
        moveDetail.style.opacity = '1';
        moveDetail.classList.add('animating');
        moveDetail.style.transform = '';
      });

      moveDetail.addEventListener('transitionend', function listener() {
        moveDetail.classList.remove('animating');
        (<any> moveDetail.style).willChange = 'transform';
        moveDetail.removeEventListener('transitionend', listener);
      });
    });
  }

  private closeDropdown(moveDetail: HTMLElement) {
    requestAnimationFrame(() => {
      (<any> moveDetail.style).willChange = 'transform';
      moveDetail.style.transform = '';

      requestAnimationFrame(() => {
        moveDetail.classList.add('animating');
        moveDetail.style.transform = 'scaleY(0.01)';
      });

      moveDetail.addEventListener('transitionend', function listener() {
        moveDetail.classList.remove('animating');
        moveDetail.classList.add('hidden');
        (<any> moveDetail.style).willChange = '';
        moveDetail.removeEventListener('transitionend', listener);
      });
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
