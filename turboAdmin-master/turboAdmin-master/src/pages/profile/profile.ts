import { HomePage } from './../home/home';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseProvider } from '../../providers/firebase/firebase';



/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {
	uid: any;
	public profileForm;
	formData: any;
	imageDataUrl: any;
	user: { website?: any, location?: any, whoWeAre?: any, whyWorkWithUs?: any, contact?: any } = {};
	// profileurl: any;
	newImageUrl: any
	backgroundImageUrl: any;
	profileImageUrl: any;
	picType: any;

	constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public actionSheetCtrl: ActionSheetController, private camera: Camera, public firebase: FirebaseProvider, public alertCtrl: AlertController) {
		this.uid = navParams.get('uidData');
		this.initializeForm();
	}

	initializeForm(): void {
		this.profileForm = this.formBuilder.group({
			website: ['', Validators.compose([Validators.required])],
			location: ['', Validators.compose([Validators.required])],
			whoWeAre: ['', Validators.compose([Validators.required])],
			whyWorkWithUs: ['', Validators.compose([Validators.required])],
			contact: ['', Validators.compose([Validators.required])]

		});

	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
		// console.log('uidddd',this.uid)
		// this.addProfile()
	}

	showSuccesfulUploadAlert() {
		let alert = this.alertCtrl.create({
			title: 'Uploaded!',
			subTitle: 'Picture is uploaded ',
			buttons: ['OK']
		});
		alert.present();

		// clear the previous photo data in the variable

	}

	addProfile() {
		this.formData = this.profileForm.value;
		console.log('uidddd', this.uid, this.profileImageUrl, this.backgroundImageUrl)

		firebase.database().ref('/users/' + this.uid).child('Profile').set({
			website: this.profileForm.value.website,
			location: this.profileForm.value.location,
			whoWeAre: this.profileForm.value.whoWeAre,
			whyWorkWithUs: this.profileForm.value.whyWorkWithUs,
			contact: this.profileForm.value.contact,
			imagedata: this.profileImageUrl,
			backgroundUrl: this.backgroundImageUrl
		})

		this.navCtrl.push(HomePage)
	}


	back() {
		this.navCtrl.pop();
	}

	uploadProfile(data, picType) {
		var storageLocation = "";
		if (picType == "profile") {
			storageLocation = '/photos/profile/';
			this.firebase.uploadProfile(data, storageLocation).then((url) => {
				console.log("url imageUpload", url)
				this.profileImageUrl = url;
				this.showSuccesfulUploadAlert();
			})
		} else if (picType == "background") {
			storageLocation = '/photos/background/';
			this.firebase.uploadProfile(data, storageLocation).then((url) => {
				console.log("url imageUpload", url)
				this.backgroundImageUrl = url;
				this.showSuccesfulUploadAlert();
			})
		}

	}

	onImageSelect(event, picType) {
		// console.log('Image Data', event.src.split(',')[1]);

		var imageData = event.src.split(',')[1];
		this.uploadProfile(imageData, picType);
	}
}

