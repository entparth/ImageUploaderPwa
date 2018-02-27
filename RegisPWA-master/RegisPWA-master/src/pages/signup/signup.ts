import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ActionSheetController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { FireDataProvider } from '../../providers/fire-data/fire-data';
import * as moment from 'moment';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { DashboardPage } from '../dashboard/dashboard';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm;
  returnInvalid: boolean = false;
  profileurl: any = '';
  profilePicUrl = '../assets/images/imgPlaceholder.png';
  loading: any;
  user: {fullName?: any, email?: any, pass?: any} = {};
  imageData: any;
  formData: any;
  errormessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireData: FireDataProvider,
					public formBuilder: FormBuilder, private camera: Camera, 
					public actionSheetCtrl: ActionSheetController, public loadingCtrl: LoadingController,
					public viewCtrl: ViewController) {
  	this.initializeForm();
  }
  cancelClick() {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  initializeForm(): void {
			this.signupForm = this.formBuilder.group({
				fullName: ['', Validators.compose([Validators.required])],
				email: ['', Validators.compose([Validators.required])],
				password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
				
			});            
		
	}
	clearErrors() {
		if (this.user.fullName == '' || this.user.email == '' || this.user.pass == '') {
			this.returnInvalid = false;
		}
	}

	signupUser() {
		this.formData = this.signupForm.value;
		var fullname = this.formData['fullName'];
		    if(!(fullname.indexOf(' ') >= 0)){
		        this.formData['firstName'] =  fullname.substr(fullname.indexOf(' ')+1);
		        this.formData['lastName'] = " ";
		    }else{
		        this.formData['firstName'] =  fullname.substr(0,fullname.indexOf(' '));
		        this.formData['lastName'] =  fullname.substr(fullname.indexOf(' ')+1);
    	}
		console.log('Run signupUser');
		// this.returnInvalid = true;

			var createdAt = moment().format();
			

			this.fireData.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.firstName, this.signupForm.value.lastName, createdAt, this.profileurl)
				.then((data) => {
					console.log('test', data);
					this.loading.dismiss().then(() => {					
						this.navCtrl.setRoot(DashboardPage);
					});
				}, (error) => {
					this.loading.dismiss().then(() => {
						this.errormessage = error.message;
						this.returnInvalid = true;

					});
				});
			this.loading = this.loadingCtrl.create({content: 'Signing you up..'});
			this.loading.present();
		}


		uploadImage() {
		let actionSheet = this.actionSheetCtrl.create({
				buttons: [
					{
						text: 'Take Photo',
						handler: () => {
							this.selectImage(0);
						}
					},
					{
						text: 'Choose from Library',
						handler: () => {
								this.selectImage(1);
						}
					},
					{
						text: 'Cancel',
						role: 'cancel'
					}
				]
			});
			actionSheet.present();
	}

	selectImage(type){
		 let options : CameraOptions = {
				quality: 90,
				targetWidth: 300,
				targetHeight: 300,
				allowEdit: true,
				destinationType: this.camera.DestinationType.DATA_URL,
				encodingType: this.camera.EncodingType.JPEG,
				mediaType: this.camera.MediaType.PICTURE,
				sourceType: (type == 0)?this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY
			};

			this.camera.getPicture(options).then((imageData) =>{
				this.imageData = imageData;
					this.fireData.uploadProfile(imageData).then((data) => {
						// this.picTaken = true;
						this.profileurl = data;
						console.log(data);
						// this.formchanged = true;
						// this.dataService.updateProfilePicDetails(this.uid, this.profileurl).then((data)=>{}).catch((err)=>{console.log(err)});
					})
					.catch((err) => {
						console.log(err);
					});
			});
	}
	login(){
		this.viewCtrl.dismiss();
		this.navCtrl.push(LoginPage);
	}
	}

