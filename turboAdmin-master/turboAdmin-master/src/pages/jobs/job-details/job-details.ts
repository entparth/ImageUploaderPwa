import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../../providers/firebase/firebase';
/**
 * Generated class for the JobDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
})
export class JobDetailsPage {
  jobDetails: any;
  editable: boolean = false;
  status: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private firebase: FirebaseProvider) {
    this.jobDetails = this.navParams.get('job');
    this.status = this.jobDetails.details.status;
    console.log(this.jobDetails);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobDetailsPage');
  }
  edit(){
    this.editable = true;
  }
  cancelEdit(){
    this.editable = false;
  }
  changeStatus($event){
    this.status = false;
  }
  save(jobDetails){
    this.editable = false;
    this.firebase.updateJob(jobDetails).then((data: any) => {
			// this.jobsFound = true;
			// this.jobs = data.jobs;
			console.log('allJobs ', data);				
		}).catch((err) => {
			// this.jobsFound = false;
			console.log('Fetch Jobs Error ', err);
		});
  }

}
