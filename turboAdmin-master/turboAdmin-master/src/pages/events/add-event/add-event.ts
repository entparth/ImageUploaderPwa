import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'page-add-event',
	templateUrl: 'add-event.html',
})
export class AddEventPage {
	public addEventForm;

	constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public viewCtrl: ViewController) {
		this.initializeAddEventForm();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddEventPage');
	}

	initializeAddEventForm() {
		this.addEventForm = this.formBuilder.group({
			title: ['', Validators.compose([Validators.required])],
			date: ['', Validators.compose([Validators.required])],
			time: ['', Validators.compose([Validators.required])],
			location: ['', Validators.compose([Validators.required])],			
			description: ['', Validators.compose([Validators.required])],
			instructions: ['', Validators.compose([Validators.required])],
			selectedSchools: ['', Validators.compose([Validators.required])]
		});
	}

	submitAddEventForm() {
		// console.log(this.addEventForm);
		if (this.addEventForm.valid) {
			this.viewCtrl.dismiss({ formData: this.addEventForm.value });			
		}
	}

}
