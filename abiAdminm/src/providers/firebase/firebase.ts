import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FirebaseProvider Provider');
  }


  servicesSave(servicesId: any, subservices: string, Questions: string, imageUrl: string , ) {
    return new Promise((resolve, reject) => {
      var serviceRef = firebase.database().ref('/services/' + servicesId).child("subServices")
      var newService = serviceRef.push();

      newService.set({
        id: newService.key,
        services: servicesId,
        SubService: subservices,
        Questions: Questions,
        image: imageUrl


      }).catch((error) => {
        console.log(error)
        reject(error)

      })
      resolve();
    })
  }

  getServices() {
    var returnArr = [];
    var innerElement = [];
    return new Promise((resolve, reject) => {
      var userId = firebase.auth().currentUser.uid;
      console.log('firebase inner userid', userId)
      firebase.database().ref('/services/').once('value').then(function (snapshot) {
        let services = snapshot.val();
        console.log('Services ', services);
        for (let key in services) {
          if (services.hasOwnProperty(key)) {
            let element = services[key];
            // if (element.subSerices) {
            // element.subServices = _.toArray(element.subServices); 

            // }
            element.subServices = _.toArray(element.subServices);

            // console.log(_.toArray(element.subServices));
            returnArr.push(element);
          }

        }

        resolve(returnArr)
        console.log("first for in", returnArr);

        var servicesArr = [];
        console.log("new retu", servicesArr);
      }, err => {
        console.log(err);
        reject(err)
      })

    })
  }


  uploadImage(data) {
    var filename = (new Date()).getTime() + '.jpg';
    let uploadTask = firebase.storage().ref('/photos/' + filename).putString(data, 'base64', { contentType: 'image/jpeg' });
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', (snapshot) => {

      }, (err) => {
        reject(false);
      }, () => {
        console.log("image upload fire data", uploadTask.snapshot.downloadURL);

        resolve(uploadTask.snapshot.downloadURL);
        return;

      });
    });
  }

  
}
