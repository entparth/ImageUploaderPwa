import { CategoriesPage } from './../categories/categories';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';

/**
 * Generated class for the ServicesFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services-form',
  templateUrl: 'services-form.html',
})
export class ServicesFormPage {
  user: { services?: string, subServices?: string } = {};
  public ServicesForm;
  getCategories: any;
  imageData: any;
  profileurl: any = '';
  profileImageUrl: any;
  backgroundImageUrl: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formbuilder: FormBuilder, public firebase: FirebaseProvider, public alert: AlertController, public loadingCtrl: LoadingController, public camera: Camera, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
    this.intitalizeform()

  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ServicesFormPage');
  //   this.getServicesFirebase()
  // }

  ionViewWillEnter() {
    this.getServicesFirebase()
    console.log(' ServicesFormPage');

  }

  intitalizeform() {
    this.ServicesForm = this.formbuilder.group({
      services: ["", Validators.compose([Validators.required])],
      subServices: ["", Validators.compose([Validators.required])],
      questions: ["", Validators.compose([Validators.required])]
    })
    console.log("form services ", this.ServicesForm.services)

  }

  presentAlert() {
    let alert = this.alert.create({
      title: 'Services added',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  servicesSubmit() {
    console.log("id", this.ServicesForm.value.services.id)
    console.log("ubservice", this.ServicesForm.value.subServices)
    console.log("question", this.ServicesForm.value.questions)
    var addService = this.firebase.servicesSave(this.ServicesForm.value.services.id, this.ServicesForm.value.subServices, this.ServicesForm.value.questions, this.profileImageUrl)
    this.ServicesForm.reset();
    this.presentAlert()


  }

  gotocatPage() {
    this.navCtrl.push(CategoriesPage)
  }


  getServicesFirebase() {
    var loader = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Getting Categories'

    })
    loader.present();

    this.firebase.getServices().then((data) => {
      // this.firebaseServices.push(data)
      this.getCategories = data
      loader.dismiss();
    });

  }
  uploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded ',
      buttons: ['OK']
    });
    alert.present();

    // clear the previous photo data in the variable

  }

  uploadImageUrl(data) {

    this.firebase.uploadImage(data).then((url) => {
      console.log("url imageUpload", url)
      this.profileImageUrl = url;
      this.uploadAlert();
    })


  }

  onImageSelect(event) {
    console.log('Image Data', event.src.split(',')[1]);

    var imageData = event.src.split(',')[1];
    this.uploadImageUrl(imageData);
  }
}

  // uploadImage() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     buttons: [
  //       {
  //         text: 'Take Photo',
  //         handler: () => {
  //           this.selectImage(0);
  //         }
  //       },
  //       {
  //         text: 'Choose from Library',
  //         handler: () => {
  //           this.selectImage(1);
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

  // selectImage(type) {
  //   let options: CameraOptions = {
  //     quality: 90,
  //     targetWidth: 300,
  //     targetHeight: 300,
  //     allowEdit: true,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: (type == 0) ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY
  //   };

  //   this.camera.getPicture(options).then((imageData) => {
  //     this.imageData = imageData;
  //     var servId = this.ServicesForm.value.services.id
  //     this.firebase.uploadProfile(imageData, servId).then((data) => {
  //       // this.picTaken = true;
  //       this.profileurl = data;
  //       console.log(data);
  //       // this.formchanged = true;
  //       // this.dataService.updateProfilePicDetails(this.uid, this.profileurl).then((data)=>{}).catch((err)=>{console.log(err)});
  //     })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });
  // }  