import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { FireDataProvider } from '../../providers/fire-data/fire-data';
import { DashboardPage } from '../dashboard/dashboard';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	public loginForm;
	returnInvalid: boolean = false;
	user: {email?: any, password?: any} = {};
	loading: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public formBuilder: FormBuilder, public fireData: FireDataProvider) {
  	 	this.initializeForm();
  }
  cancelClick(){
  	this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
   initializeForm() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.compose([Validators.required ])],
			password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
		});
	}
	
	clearErrors() {
		if(this.user.email == "" || this.user.password == "") {
			this.returnInvalid = false;
		}
	}

	loginUser(): void {
		// console.log(this.user);
		// this.returnInvalid = true;
		if (!this.loginForm.valid) {
			console.log(this.loginForm.value);
		} else {
			this.fireData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
				this.loading.dismiss().then(() => {
					this.navCtrl.setRoot(DashboardPage);
								
				});
			}, error => {
				this.loading.dismiss().then(() => {
					this.returnInvalid = true;
				});
			});

			this.loading = this.loadingCtrl.create({content: 'Logging you in...'});
			this.loading.present();
		}        
	}
	signup(){
  	this.navCtrl.push(SignupPage);
  	}
}
