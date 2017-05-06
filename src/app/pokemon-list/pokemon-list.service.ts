import { Injectable } from '@angular/core';

@Injectable()
export class PokemonListService {
  private keyMap = {
    ArrowLeft: -1,
    ArrowRight:  1
  };

  mapKeyEvent(key: string) {
    const leftOrRight = this.keyMap[key];

    if (leftOrRight) {
      return leftOrRight;
    } else {
      return this.computeListElementsPerRow() * (key === 'ArrowDown' ? 1 : -1);
    }
  }

  private computeListElementsPerRow() {
    const li = document.querySelector('li');
    const liWidth = li.offsetWidth;
    const liMargin = this.parsePixelValue(window.getComputedStyle(li).margin);

    const a = Math.floor(document.body.offsetWidth / (liWidth + liMargin));
    return a;
  }

  private parsePixelValue(pixels: string) {
    return parseFloat(pixels) || 0;
  }
}
