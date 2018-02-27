import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AddJobPage } from '../add-job/add-job';

import { FirebaseProvider } from '../../../providers/firebase/firebase';
import { JobDetailsPage } from '../job-details/job-details';
import { GlobalsProvider } from "../../../providers/globals/globals";

@IonicPage()
@Component({
	selector: 'page-jobs',
	templateUrl: 'jobs.html',
})
export class JobsPage {
	// Testing Variable
	// jobs = [{ id: 1, title: 'test 1' }, { id: 2, title: 'test 2' }, { id: 3, title: 'test 3' }, { id: 4, title: 'test 4' }, { id: 5, title: 'test 5' }, { id: 6, title: 'test 6' }, { id: 7, title: 'test 7' }];
	jobs = [];
	jobsFound: boolean = null;	

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController, public fireBase: FirebaseProvider, public _zone: NgZone, public globals: GlobalsProvider) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad JobsPage');
		if (this.globals.jobs != null) {
			this.jobs = this.globals.jobs;
			console.log('jobs', this.jobs);
			this.jobsFound = true;
		}
		else{
			this.jobsFound = false;
		}
		
	}

	openAddJobModal() {
		var addJobModal = this.modalCtrl.create(AddJobPage);

		addJobModal.present();

		addJobModal.onDidDismiss((data) => {
			// console.log('Add Job Modal Data ', data.formData);
			if (data) {
				var jobData = data.formData;
				this.fireBase.addJob(jobData).then((data: any) => {
					if (data.success) {
						var addJobAlert = this.alertCtrl.create({
							title: 'Success!',
							message: 'Job Added Successfully.',
							buttons: [
								{
									text: 'Ok',
									role: 'cancel'
								}
							]
						});

						addJobAlert.present();
					}
				}).catch((err) => {
					console.log('Add Job Error ', err);
				});
			}
		});
	}

	jobDetails(job){
		this.navCtrl.push(JobDetailsPage, {'job':job});
	}
}
