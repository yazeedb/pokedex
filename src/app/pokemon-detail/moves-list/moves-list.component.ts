import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-moves-list',
  templateUrl: './moves-list.component.html',
  styleUrls: ['./moves-list.component.scss']
})
export class MovesListComponent implements OnInit {
  @Input()
  moves: any[];

  moveMap: {};

  naturalMoves: any[];
  machineMoves: any[];
  tutorMoves: any[];

  ngOnInit() {
    this.moveMap = this.sortMoves(this.moves);
    this.naturalMoves = this.moveMap['level-up'];
    this.machineMoves = this.moveMap['machine'];
    this.tutorMoves = this.moveMap['tutor'];
    console.log(this.moveMap);
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
