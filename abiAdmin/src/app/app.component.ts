import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { GlobalsProvider } from '../providers/globals/globals';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  activePage:any;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public globals:GlobalsProvider) {
    this.initializeFirebase();
    

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

 
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  checkActive(page) {
    return page = this.activePage;
  }

  initializeFirebase() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCNY9wLUGkxxvM24xJRA8dRC5jzB76SkEk",
      authDomain: "abiapp-f92d3.firebaseapp.com",
      databaseURL: "https://abiapp-f92d3.firebaseio.com",
      projectId: "abiapp-f92d3",
      storageBucket: "abiapp-f92d3.appspot.com",
      messagingSenderId: "471872001384"
    };

    firebase.initializeApp(config);
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      // console.log('USER ', user);
      if (!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else {
        this.globals.userId = user.uid;
        console.log('entered inner else loop')
        // this.globals.gloEmail = user.email
        // this.getUserData().then(() => {

        //   this.rootPage = HomePage;
        // }).catch(() => {
        //   console.log('Data Not Fetched. Trying Again.');
        //   // this.getUserData();
        // });
        unsubscribe();
      }
    });
    };
  }
