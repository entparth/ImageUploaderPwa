import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-add-job',
  templateUrl: 'add-job.html',
})
export class AddJobPage {
	public addJobForm;

	newJobData: {title: string, role: string, desc: string, instructions: string, selectedSchools: string
	} = {title: '', role: '', desc: '', instructions: '', selectedSchools: ''};

	constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public viewCtrl: ViewController) {
		this.initializeAddJobForm();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddJobPage');
	}

	initializeAddJobForm() {
		this.addJobForm = this.formBuilder.group({
			title: ['', Validators.compose([Validators.required])],
			role: ['', Validators.compose([Validators.required])],
			description: ['', Validators.compose([Validators.required])],
			instructions: ['', Validators.compose([Validators.required])],
			selectedSchools: ['', Validators.compose([Validators.required])],
			status: ['true']
		});
	}

	submitAddJobForm() {
		// console.log(this.addJobForm);
		if (this.addJobForm.valid) {
			this.viewCtrl.dismiss({ formData: this.addJobForm.value });
		}		
	}

}
