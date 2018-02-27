import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';

import { GlobalsProvider } from '../globals/globals';
import {AlertController} from 'ionic-angular';
// import { NativeStorage } from '@ionic-native/native-storage';

// import { Storage } from '@ionic/storage';

/*
  Generated class for the FireDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FireDataProvider {
	firebaseUsers: any;
	confirmationResult: any = undefined;


  constructor(public globals: GlobalsProvider, public alertCtrl: AlertController) {

    console.log('Hello FireDataProvider Provider');
  }

  /**
	 * [loginUser We'll take an email and password and log the user into the firebase app]
	 * @param  {string} email    [User's email address]
	 * @param  {string} password [User's password]
	 */
	loginUser(email: string, password: string): firebase.Promise<any> {
		this.saveLogInInfo;
		return firebase.auth().signInWithEmailAndPassword(email, password);
		
	}

	saveLogInInfo()
	{

		// this.storage.set(this.globals.HAS_LOGGED_IN, true);
	}



	/**
	 * [signupUser description]
	 * This function will take the user's email and password and create a new account on the Firebase app, once it does
	 * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
	 * that node to store the profile information.
	 * @param  {string} email    [User's email address]
	 * @param  {string} password [User's password]
	 */
	signupUser(email: string, password: string, firstName: string, lastName: string, createdAt: string, profileurl: any): firebase.Promise<any> {
			return new Promise((resolve, reject) => { 
			firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
				// this.geolocation.getCurrentPosition().then((resp) => {
					// resp.coords.latitude
					// resp.coords.longitude
					this.saveLogInInfo();

					firebase.database().ref('/users').child(newUser.uid).set({
					email: email,
					// id:newUser.uid,
					firstName: firstName,
					lastName: lastName,
					createdAt: createdAt,
					profileurl: profileurl,
					// location: {
					// 	lat: resp.coords.latitude,
					// 	lang: resp.coords.longitude
					// }
					});

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
	signupFBUser(email:string, displayName: string, photoURL: any, uid: any, createdAt: string): firebase.Promise<any> {

		return new Promise((resolve, reject) => {
			firebase.database().ref('/users').child(uid).set({
				// firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
				// this.geolocation.getCurrentPosition().then((resp) => {
					// resp.coords.latitude
					// resp.coords.longitude
					// this.saveLogInInfo();

					// firebase.database().ref('/users').child(uid).set({
					email: email,
					id:uid,
					firstName: displayName,
					lastName: displayName,
					createdAt: createdAt,
					profileurl: photoURL,
					// location: {
					// 	lat: resp.coords.latitude,
					// 	lang: resp.coords.longitude
					// },
					// authyCred: authyCred
					});
		});


	}

	

	 public  uploadProfile(data){
			var filename = (new Date()).getTime() + '.jpg';
			let uploadTask = firebase.storage().ref('/photos/profile/' + filename).putString(data, 'base64', {contentType: 'image/jpeg'});
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



	getCurrentUser() {
		return new Promise((resolve, reject) => {
			var user = firebase.auth().currentUser;
			if (user != null) {
				/*console.log('Run => fire-data: getCurrentUser()');
				console.log(user);*/
				
				//get the user uid and fetch data from firebase
				var uid = user.uid;
				this.getCurrentUserData(uid).then(() => {
					resolve();
				});					
			}
		});
		
	}

	getCurrentUserData(uid) {
		return new Promise((resolve, reject) => {
			var currentUserRef = firebase.database().ref('/users/' + uid);
			currentUserRef.on("value", (data) => {
				console.log('Run => fire-data: getCurrentUserData()');
				console.log(data.val());
				this.globals.userType = data.val().type;
				// this.storage.set('userType', this.globals.userType);
				this.globals.AUTHY_PHONE_VERIFIED = data.val().authyCred.verified;
				resolve();
			});
		});
		
	}

	/**
	 * [resetPassword description]
	 * This function will take the user's email address and send a password reset link, then Firebase will handle the
	 * email reset part, you won't have to do anything else.
	 *
	 * @param  {string} email    [User's email address]
	 */
	resetPassword(email: string): firebase.Promise<any> {
		return firebase.auth().sendPasswordResetEmail(email);
	}

	/**
	 * This function doesn't take any params, it just logs the current user out of the app.
	 */
	logoutUser(): firebase.Promise<any> {

		return firebase.auth().signOut();
	}




}
