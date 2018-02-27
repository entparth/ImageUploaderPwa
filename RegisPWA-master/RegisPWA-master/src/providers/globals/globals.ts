import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
	Generated class for the GlobalsProvider provider.

	See https://angular.io/docs/ts/latest/guide/dependency-injection.html
	for more info on providers and Angular DI.
*/
@Injectable()
export class GlobalsProvider {
	EMAIL_VERIFIED: boolean;
	AUTHY_PHONE_VERIFIED: boolean;
	HAS_LOGGED_IN = 'hasLoggedIn';
	userId: any;
	userType: string;
	pushToken: string;

	allHelpers: any;

	//added from vi_debug branch because map was behaving weird
	allHelpersArr = new Array();

	constructor(public http: Http) {
		console.log('Hello GlobalsProvider Provider');
	}
	public clear(clearGlobals: boolean) {
		this.EMAIL_VERIFIED = undefined;
		this.AUTHY_PHONE_VERIFIED = undefined;
		this.userId = undefined;
		this.userType = undefined;
		this.pushToken = undefined;
		this.allHelpers = undefined;
	}
}
