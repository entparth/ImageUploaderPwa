import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalsProvider {
  userId: string = "";
  userEmail: any;
  userData: any;

  constructor(public http: HttpClient) {
    console.log('Hello GlobalsProvider Provider');
  }

  clear() {
    this.userId = undefined;
  }
}
