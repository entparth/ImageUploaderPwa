import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { OnboardingPage } from '../onboarding/onboarding';
import { SignupPage } from '../signup/signup';
import * as firebase from 'firebase';
import { DashboardPage } from '../dashboard/dashboard';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {

  }
  login(){
  	this.navCtrl.push(LoginPage);
  }
  signup(){
    let contactModal = this.modalCtrl.create(SignupPage);
   contactModal.present();
  	// this.navCtrl.push(SignupPage);
  }
  googlelogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
      

    firebase.auth().getRedirectResult().then(function(result) {
      console.log(result);
      this.navCtrl.setRoot(DashboardPage);

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    var createdAt = moment().format();

      firebase.database().ref('/users').child(result.user.uid).set({
      
          email: result.user.email,
          id:result.user.uid,
          firstName: result.user.displayName,
          lastName: result.user.displayName,
          createdAt: createdAt,
          profileurl: result.user.photoURL,
      
          });
        
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    // var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    // ...
  });

  }
  facebooklogin()
  {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
      

    firebase.auth().getRedirectResult().then(function(result) {
      this.loading.dismiss();
      this.navCtrl.setRoot(DashboardPage);
      console.log(result);
      console.log(result.user.photoURL);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      var createdAt = moment().format();

      firebase.database().ref('/users').child(result.user.uid).set({
      
          email: result.user.email,
          id:result.user.uid,
          firstName: result.user.displayName,
          lastName: result.user.displayName,
          createdAt: createdAt,
          profileurl: result.user.photoURL,
      
          });
     
     }).catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code;
    var errorMessage = error.message;

     });

     this.loading = this.loadingCtrl.create({content: 'Signing you up..'});
      this.loading.present();
  }
}
