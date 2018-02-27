import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { SignupPage } from '../pages/signup/signup';

import { JobsPage } from "../pages/jobs/jobs/jobs";
import { AddJobPage } from '../pages/jobs/add-job/add-job';
import { JobDetailsPage } from '../pages/jobs/job-details/job-details';


import { EventsPage } from "../pages/events/events/events";
import { AddEventPage } from "../pages/events/add-event/add-event";
import { EventDetailsPage } from "../pages/events/event-details/event-details";

import { SettingsPage } from '../pages/settings/settings';
import { CandidatesPage } from '../pages/candidates/candidates';
import { MessagePage } from '../pages/message/message';

import { } from "module";


import { Camera } from '@ionic-native/camera';
import { ProfilePage } from '../pages/profile/profile';
import { GlobalsProvider } from '../providers/globals/globals';

import { ImageUploadModule } from "angular2-image-upload";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    JobsPage,
    JobDetailsPage,
    AddJobPage,
    EventsPage,
    AddEventPage,
    EventDetailsPage,
    ProfilePage,
    SettingsPage,
    CandidatesPage,
    MessagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { mode: 'ios' }),
    ImageUploadModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    JobsPage,
    JobDetailsPage,
    AddJobPage,
    EventsPage,
    AddEventPage,
    EventDetailsPage,
    ProfilePage,
    SettingsPage,
    CandidatesPage,
    MessagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    Camera,
    GlobalsProvider
  ]
})
export class AppModule {}
