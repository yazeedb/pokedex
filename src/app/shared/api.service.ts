import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { CacheService } from './cache.service';

@Injectable()
export class ApiService {
  constructor(private http: Http, private cache: CacheService) {}

  get(uri: string) {
    // use cached response, if found
    const cachedResponse = this.cache.get(uri);

    if (cachedResponse) {
      return this
        .getFromCache(cachedResponse)
        .map(res => JSON.parse(res));
    }

    // otherwise, cache and return the new data
    return this.http
      .get(uri)
      .map(res => {
        const body = res['_body'];

        this.cache.set(uri, body);
        return JSON.parse(body);
      });
  }

  private getFromCache(res: any): Observable<any> {
    return Observable.create((observer: Observer<number>) => {
      observer.next(res);
      observer.complete();
    });
  }
}
