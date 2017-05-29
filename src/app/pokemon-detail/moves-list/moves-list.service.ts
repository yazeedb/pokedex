import { Injectable } from '@angular/core';

@Injectable()
export class MovesListService {
  openDropdown(el: HTMLElement) {
    requestAnimationFrame(() => {
      el.classList.remove('hidden');
      (<any> el).style.willChange = 'opacity, transform';
      el.style.opacity = '0';
      el.style.transform = 'scaleY(0.01)';

      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.classList.add('animating');
        el.style.transform = '';
      });

      el.addEventListener('transitionend', function listener() {
        el.classList.remove('animating');
        (<any> el.style).willChange = 'transform';
        el.removeEventListener('transitionend', listener);
      });
    });
  }

  closeDropdown(el: HTMLElement) {
    requestAnimationFrame(() => {
      (<any> el.style).willChange = 'transform';
      el.style.transform = '';

      requestAnimationFrame(() => {
        el.classList.add('animating');
        el.style.transform = 'scaleY(0.01)';
      });

      el.addEventListener('transitionend', function listener() {
        el.classList.remove('animating');
        el.classList.add('hidden');
        (<any> el.style).willChange = '';
        el.removeEventListener('transitionend', listener);
      });
    });
  }
}
