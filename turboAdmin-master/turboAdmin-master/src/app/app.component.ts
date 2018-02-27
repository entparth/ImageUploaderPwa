import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from "firebase";

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { JobsPage } from "../pages/jobs/jobs/jobs";
import { EventsPage } from "../pages/events/events/events";
import { SettingsPage } from '../pages/settings/settings';
import { CandidatesPage } from '../pages/candidates/candidates';
import { MessagePage } from '../pages/message/message';

import { GlobalsProvider } from '../providers/globals/globals';
import { ProfilePage } from '../pages/profile/profile';
import { FirebaseProvider } from '../providers/firebase/firebase';

import * as _ from 'lodash';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = '';
	activePage: any;
	// rootPage: any = LoginPage;
	// rootPage: any = JobsPage;  // Test
	// rootPage: any = EventsPage; // Test 



	pages: Array<{ title: string, component: any }>;

	constructor(public menuCtrl: MenuController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public globals: GlobalsProvider, public fireBase: FirebaseProvider) {
		this.initializeFirebase();

		this.initializeApp();
		// used for an example of ngFor and navigation
		this.pages = [
			{ title: 'Dashboard', component: HomePage },
			{ title: 'Jobs', component: JobsPage },
			{ title: 'Events', component: EventsPage },
			{ title: 'Search', component: HomePage },
			{ title: 'My Candidates', component: CandidatesPage },
			{ title: 'Messages', component: MessagePage },
			{ title: 'Settings', component: SettingsPage },
			{ title: 'Log Out', component: LoginPage }
		];
		this.activePage = this.pages[0];
		this.menuCtrl.enable(false);

	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.styleDefault();
			this.splashScreen.hide();

			this.getUserData();
		});
	}

	openPage(page) {
		if (page.title == 'Log Out') {
			this.fireBase.logout().then(() => {
				this.nav.setRoot(page.component);
				this.activePage = page;
			});
		} else {
			// Reset the content nav to have just this page
			// we wouldn't want the back button to show in this scenario
			this.nav.setRoot(page.component);
			this.activePage = page;
		}
	}

	checkActive(page) {
		return page = this.activePage;
	}


	initializeFirebase() {
		var config = {
			apiKey: "AIzaSyAFfmQRPPuboHbmHiFyVxbea8FWV5w2t5g",
			authDomain: "turbo-3652c.firebaseapp.com",
			databaseURL: "https://turbo-3652c.firebaseio.com",
			projectId: "turbo-3652c",
			storageBucket: "turbo-3652c.appspot.com",
			messagingSenderId: "198447009690"
		};
		firebase.initializeApp(config);
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			console.log('USER ', user);
			if (!user) {
				this.rootPage = LoginPage;
				unsubscribe();
			} else {
				this.globals.userId = user.uid;
				this.rootPage = HomePage;
				unsubscribe();
			}
		});
	}

	getUserData() {
		this.fireBase.getUserData().then((data :any) => {
			var userData = data.data[this.globals.userId];

			console.log('All Data ', userData);
			this.globals.userData = userData;

			this.globals.jobs = _.toArray(userData.jobs);

			this.globals.events = _.toArray(userData.events);

			console.log(this.globals.jobs, this.globals.events);

		}).catch((err) => {
			console.log('All Data Err ', err);
		});
	}
}
