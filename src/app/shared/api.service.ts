import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';

import { CacheService } from './cache.service';

@Injectable()
export class ApiService {
  constructor(private http: Http, private cache: CacheService) {}

  get(uri: string) {
    return this.cache
      .get(uri)
      .map(res => {
        if (!res) {
          throw new Error('no cached data');
        }

        return res;
      })
      .catch((err, caught) => {
        return this.http
          .get(uri)
          .pluck('_body')
          .do(body => this.cache.set(uri, body));
      })
      .map((res: string) => JSON.parse(res));
  }
}
