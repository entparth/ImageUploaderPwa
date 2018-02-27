import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ActionSheetController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as moment from 'moment';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm;
  user: {firstName?: any, lastName?: any, email?: any, password?: any} = {};
  formData: any;
  loading: any;
  errormessage: any;
  returnInvalid: boolean;
  allData:any;
  // profileurl: string = "http://i.ytimg.com/vi/MIGkfEK0-0k/mqdefault.jpg";
  imageData: any;

 constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public firebase: FirebaseProvider, public loadingCtrl: LoadingController, private camera: Camera, public actionSheetCtrl: ActionSheetController, private menuCtrl:MenuController) {
     this.initializeForm();
 }

 initializeForm(): void {
     this.signupForm = this.formBuilder.group({
       firstName: ['', Validators.compose([Validators.required])],
       lastName: ['', Validators.compose([Validators.required])],
       unit: ['', Validators.compose([Validators.required])],
       email: ['', Validators.compose([Validators.required])],
       password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
       
     });            
   
 }

 back(){
   this.navCtrl.setRoot(LoginPage);
 }

 signupUser() {
   this.formData = this.signupForm.value;
   console.log('Run signupUser');
   console.log( "data output",this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.firstName, this.signupForm.value.lastName, createdAt)
   
   // this.returnInvalid = true;
     var createdAt = moment().format();
     

     this.firebase.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.firstName, this.signupForm.value.lastName, createdAt)
       .then((data) => {
         console.log('test', data);
         this.allData = data;
         console.log("uidd", this.allData.uid)
         this.loading.dismiss().then(() => {	
                   
           this.navCtrl.push(ProfilePage,{uidData:this.allData.uid});
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

//  uploadImage() {
//    let actionSheet = this.actionSheetCtrl.create({
//        buttons: [
//          {
//            text: 'Take Photo',
//            handler: () => {
//              this.selectImage(0);
//            }
//          },
//          {
//            text: 'Choose from Library',
//            handler: () => {
//                this.selectImage(1);
//            }
//          },
//          {
//            text: 'Cancel',
//            role: 'cancel'
//          }
//        ]
//      });
//      actionSheet.present();
//  }

//  selectImage(type){
//     let options : CameraOptions = {
//        quality: 90,
//        targetWidth: 300,
//        targetHeight: 300,
//        allowEdit: true,
//        destinationType: this.camera.DestinationType.DATA_URL,
//        encodingType: this.camera.EncodingType.JPEG,
//        mediaType: this.camera.MediaType.PICTURE,
//        sourceType: (type == 0)?this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY
//      };

//      this.camera.getPicture(options).then((imageData) =>{
//        this.imageData = imageData;
//          this.firebase.uploadProfile(imageData).then((data) => {
//            // this.profileurl = data;
//            console.log(data);
           
//          })
//          .catch((err) => {
//            console.log(err);
//          });
//      });
//  }
   
  ionViewWillEnter(){
   this.menuCtrl.enable(false);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  ionViewDidLeave(){
   this.menuCtrl.enable(false);
    
  }
}