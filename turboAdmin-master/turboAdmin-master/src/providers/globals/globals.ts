// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProvider {
	userId: string = '';
	userData: any;

	jobs = [];
	jobsFound: boolean = null;

	events = [];
	eventsFound: boolean = null;	

	constructor() {
		console.log('Hello GlobalsProvider Provider');
	}

	clear() {
		this.userId = undefined;

		this.jobs = undefined;
		this.jobsFound = undefined;
		this.events = undefined;
		this.eventsFound = undefined;
	}

}
