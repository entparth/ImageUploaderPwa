// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { GlobalsProvider } from "../globals/globals";

import * as _ from 'lodash';
@Injectable()
export class FirebaseProvider {
	firebaseUsers: any;
	confirmationResult: any = undefined;

	constructor(public globals: GlobalsProvider) {
		console.log('Hello FirebaseProvider Provider');
	}


	signupUser(email: string, password: string, firstName: string, lastName: string, createdAt: string, ) {
		return new Promise((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {

				console.log("data output", email, firstName, lastName, createdAt)
				firebase.database().ref('users').child(newUser.uid).set({
					id: newUser.uid,
					email: email,
					firstName: firstName,
					lastName: lastName,
					createdAt: createdAt,
					jobs: 'default',
					events: 'default'
					// profileurl: profileurl,

				});
				resolve(newUser);
				this.globals.userId = newUser.uid;
				// this.globals.userType = type;
				// this.sendEmailVerificationLink().then(success=> console.log(success)).catch(error=> console.log(error));
			}).catch((error) => {
				console.log('Error getting location', error);
				reject(error);
				// });
			});

		});
	}


	loginData(email: string, password: string) {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	// public uploadProfile(data) {
	// 	var filename = (new Date()).getTime() + '.jpg';
	// 	let uploadTask = firebase.storage().ref('/photos/profile/' + filename).putString(data, 'base64', { contentType: 'image/jpeg' });
	// 	return new Promise((resolve, reject) => {
	// 		uploadTask.on('state_changed', (snapshot) => {

	// 		}, (err) => {
	// 			reject(false);
	// 		}, () => {
	// 			console.log(uploadTask.snapshot.downloadURL);

	// 			resolve(uploadTask.snapshot.downloadURL);
	// 			return;
	// 		});
	// 	});
	// }

	
	addJob(jobData) {
		return new Promise((resolve, reject) => {
			var uid = this.globals.userId;
			var dbRef = firebase.database().ref('/users/' + uid).child('jobs').push();

			var uniqueJobKey = dbRef.key;
			// Add Job data to the user
			dbRef.set({
				id: uniqueJobKey,
				details: jobData
			}, () => {

				// Add Job data Globally
				var gDbRef = firebase.database().ref('/allJobs').child(uniqueJobKey);
				gDbRef.set({
					id: uniqueJobKey,
					details: jobData,
					belongsTo: uid
				}, () => {
					resolve({ success: true });
				});
			});
		});
	}
	updateJob(jobData){
		return new Promise((resolve, reject) => {
			var uid = this.globals.userId;
			var dbRef = firebase.database().ref('/users/' + uid + '/jobs').child(jobData.id).push();

			// var uniqueJobKey = dbRef.key;
			// Add Job data to the user
			dbRef.set({
				id: jobData.id,
				details: jobData
			}, () => {

				// Add Job data Globally
				var gDbRef = firebase.database().ref('/allJobs').child(jobData.id);
				gDbRef.set({
					id: jobData.id,
					details: jobData,
					belongsTo: uid
				}, () => {
					resolve({ success: true });
				});
			});
		});
	}

	addEvent(eventData) {
		return new Promise((resolve, reject) => {
			var uid = this.globals.userId;
			var dbRef = firebase.database().ref('/users/' + uid).child('events').push();
			
			var uniqueEventKey = dbRef.key;

			// Add Job data to the user
			dbRef.set({
				id: uniqueEventKey,
				details: eventData
			}, () => {

				// Add Job data Globally
				var gDbRef = firebase.database().ref('/allEvents').child(uniqueEventKey);
				gDbRef.set({
					id: uniqueEventKey,
					details: eventData,
					belongsTo: uid
				}, () => {
					resolve({ success: true });

				});
			});
		});
	}

	getUserData() {
		return new Promise((resolve, reject) => {
			var uid = this.globals.userId;
			var dbRef = firebase.database().ref('users/' + uid);

			var userData: any;

			dbRef.once('value', (data) => {
				// console.log('USERDATA ', data.val());
				if (data.val()) {
					resolve({data: data.val()});
				} else {
					reject({msg: 'Data Not Found'});
				}
			});
		});
	}

	fetchJobsByCompany() {
		var uid = this.globals.userId;
		// console.log('Uid', uid);
		return new Promise((resolve, reject) => {
			var dbRef = firebase.database().ref('/users/' + uid).child('jobs');
			var jobsArr = [];
			dbRef.once('value', (jobs) => {
				console.log('JOBS ', jobs.val());
				if (jobs.val() != 'default') {
					jobsArr = _.toArray(jobs.val());
					if (jobsArr.length > 0) {
						console.log('jobs Array ', jobsArr);
						resolve({ jobs: jobsArr });
					} else {
						reject({ msg: 'No Jobs Found' });
					}
				} else {
					reject({ msg: 'No Jobs Found' });
				}
			});
		});
	}

	fetchEventsByCompany() {
		var uid = this.globals.userId;		
		return new Promise((resolve, reject) => {
			var dbRef = firebase.database().ref('/users/' + uid).child('events');
			var eventsArr = [];
			dbRef.once('value', (events) => {
				// console.log('Event Value ', events.val());

				if (events.val() != 'default') {
					eventsArr = _.toArray(events.val());
					if (eventsArr.length > 0) {
						console.log('events Array ', eventsArr);
						resolve({ events: eventsArr });
					} else {
						reject({ msg: 'No Events Found' });
					}
				} else {
					reject({ msg: 'No Events Found' });
				}			
			});
		});
	}	

	uploadProfile(data, storageLocation){
			var filename = (new Date()).getTime() + '.jpg';
			let uploadTask = firebase.storage().ref( storageLocation + filename).putString(data, 'base64', {contentType: 'image/jpeg'});
			return new Promise((resolve, reject) => {
				uploadTask.on('state_changed', (snapshot)=>{

				}, (err) => {
						reject(false);
				}, () =>{
					 console.log( uploadTask.snapshot.downloadURL);

					 resolve(uploadTask.snapshot.downloadURL);
					 return;

				});
			});
	}

	logout() {
		return new Promise((resolve, reject) => {
			firebase.auth().signOut().then(() => {
				this.globals.clear();
				resolve();
			}, function (error) {
				reject();
			});
		});
	}

	updateEmail(oldEmail, oldPassword, newEmail){
		return new Promise((resolve, reject) => {
		firebase.auth()
			.signInWithEmailAndPassword(oldEmail, oldPassword)
			.then(function(user) {
				user.updateEmail(newEmail);
				resolve();
			}, function (error) {
				reject();
			});
		});
	}
	
	updatePassword(oldEmail, oldPassword, newPassword){
		return new Promise((resolve, reject) => {
		firebase.auth()
			.signInWithEmailAndPassword(oldEmail, oldPassword)
			.then(function(user) {
				user.updatePassword(newPassword);
				resolve();
			}, function (error) {
				reject();
			});
		});
	}
}