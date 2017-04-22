import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  constructor(private http: Http) {}

  get(uri: string) {
    return this.http
      .get(uri)
      .map(res => JSON.parse(res['_body']));
  }
}
