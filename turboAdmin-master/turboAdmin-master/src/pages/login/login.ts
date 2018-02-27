import { SignupPage } from './../signup/signup';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { EmailValidator } from '../../validator/email';
import { FormBuilder, Validators } from '@angular/forms';
import * as firebase from "firebase";
import { FirebaseProvider } from '../../providers/firebase/firebase';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm;
  loading 
  user: {email?: any, password?: any} = {};
	returnInvalid: boolean = false;
  constructor( public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController , public loadingCtrl: LoadingController, private firebase:FirebaseProvider) {
  this.initializeForm()
  }
 
  ionViewWillEnter(){
   this.menuCtrl.enable(false);
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidLeave(){
   
  }

  initializeForm() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
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
			this.firebase.loginData(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
				this.loading.dismiss().then(() => {
          this.menuCtrl.enable(true);
					this.navCtrl.setRoot(HomePage);
								
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

  
  resetPass(){
    console.log("pass reset", this.loginForm.value.email)
    var auth = firebase.auth();
    var emailAddress = this.loginForm.value.email;

    auth.sendPasswordResetEmail(emailAddress).then(()=> {
      this.presentLoadingDefault()
    // Email sent.
    }).catch(function(error) {
    // An error happened.
    });
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please check your email for reset..'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
 
  goToSignup(){
    this.menuCtrl.enable(false);
    this.navCtrl.setRoot(SignupPage);
  }
}
