import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { FireDataProvider } from '../providers/fire-data/fire-data';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public fireData: FireDataProvider) {
    this.initializeApp();
    this.initializeFirebase();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  initializeFirebase(){
      var config = {
          apiKey: "AIzaSyClB_dyp5jMA2v0DnsZ4eGldOpN_JLOFTg",
          authDomain: "regispwadev.firebaseapp.com",
          databaseURL: "https://regispwadev.firebaseio.com",
          projectId: "regispwadev",
          storageBucket: "regispwadev.appspot.com",
          messagingSenderId: "119236055251"
    };
  firebase.initializeApp(config);
  const unsubscribe = firebase.auth().onAuthStateChanged( user => {
      if(!user){
        this.rootPage = HomePage;
        unsubscribe();
      } else {
        this.rootPage = DashboardPage;
        unsubscribe();
      }
    });
  }
  signout()
  {
 
      this.fireData.logoutUser().then(() => {
          this.nav.setRoot(HomePage);
      });

  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
