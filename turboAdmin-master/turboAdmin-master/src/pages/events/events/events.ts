import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { AddEventPage } from '../add-event/add-event';
import { FirebaseProvider } from '../../../providers/firebase/firebase';

@IonicPage()
@Component({
	selector: 'page-events',
	templateUrl: 'events.html',
})
export class EventsPage {
	// Testing Variable
	// events = [{ id: 1, title: 'test 1' }, { id: 2, title: 'test 2' }, { id: 3, title: 'test 3' }, { id: 4, title: 'test 4' }, { id: 5, title: 'test 5' }, { id: 6, title: 'test 6' }, { id: 7, title: 'test 7' }];
	events = [];
	eventsFound: boolean = null;

	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, public fireBase: FirebaseProvider) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EventsPage');
		this.getAllEvents();
	}

	openAddEventModal() {
		var addEventModal = this.modalCtrl.create(AddEventPage);

		addEventModal.present();

		addEventModal.onDidDismiss((data) => {
			// console.log('Add Event Modal Data ', data.formData);
			if (data) {
				var eventData = data.formData;
				this.fireBase.addEvent(eventData).then((data: any) => {
					if (data.success) {
						var addEventAlert = this.alertCtrl.create({
							title: 'Success!',
							message: 'Event Added Successfully.',
							buttons: [
								{
									text: 'Ok',
									role: 'cancel'
								}
							]
						});

						addEventAlert.present();
					}
				}).catch((err) => {
					console.log('Add Event Error ', err);
				});
			}
		});
	}

	getAllEvents() {
		this.fireBase.fetchEventsByCompany().then((data: any) => {
			this.eventsFound = true;
			this.events = data.events;			
		}).catch((err) => {
			this.eventsFound = false;						
			console.log('Fetch Events Error ', err);
		});
	}

}
