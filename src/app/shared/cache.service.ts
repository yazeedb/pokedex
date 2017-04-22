import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  private store = window.localStorage;

  get(prop: string) {
    return this.store.getItem(prop);
  }

  set(prop: string, value: any) {
    this.store.setItem(prop, value);
  }
}
