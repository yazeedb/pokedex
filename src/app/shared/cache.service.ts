import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import * as localForage from 'localforage';

@Injectable()
export class CacheService {
  get(prop: string) {
    return Observable.fromPromise(localForage.getItem(prop));
  }

  set(prop: string, value: any) {
    return Observable.fromPromise(localForage.setItem(prop, value));
  }
}
