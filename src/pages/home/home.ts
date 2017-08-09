import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'firebase/storage';
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods

import { ToastController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

import { LoadingController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  items: FirebaseListObservable<any[]>;
  captureDataUrl: string;
  image: string = "LINK";
  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private imagePicker: ImagePicker, db: AngularFireDatabase, private Camera: Camera, private firebase: FirebaseApp, public loadingCtrl: LoadingController) {
    
    this.items = db.list('/items');


  
  }

  copiedToast() {
    let toast = this.toastCtrl.create({
      message: 'Link copiado',
      duration: 1500,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  

/**
  cogerImagen(){
      let options = {
        maximumImagesCount: 1,
        width: 300,
        height: 300,
        quality : 75,
        destinationType: this.imagePicker.getPictures
      };
      this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          this.captureDataUrl = 'data:image/jpeg;base64,' + results[i];
      }
    }, (err) => { });
  }
   */
  


hacerFoto() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.Camera.DestinationType.DATA_URL,
      encodingType: this.Camera.EncodingType.JPEG,
      mediaType: this.Camera.MediaType.PICTURE,
    };
    this.Camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      
    }, (err) => {
      // Handle error
    });
  }


  cogerImagen() {
  const cameraOptions: CameraOptions = {
    sourceType: this.Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.Camera.DestinationType.DATA_URL,      
    quality: 25,
    encodingType: this.Camera.EncodingType.JPEG,      
    correctOrientation: true
    
  }
    this.prepararImagen();
    this.Camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      
    }, (err) => {
      // Handle error
    }); 
}

  prepararImagen() {
      let loader = this.loadingCtrl.create({
        content: "Preparando imágen...",
        duration: 5000
      });
      loader.present();
    }

  generarLink() {
    let loader = this.loadingCtrl.create({
      content: "Generando Link...",
      duration: 5000
    });
    loader.present();
  }



  subirImagen() {
    try {
    this.generarLink();
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);
    
    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {

    storageRef = firebase.storage().ref().child(`images/${filename}.jpg`);
    storageRef.getDownloadURL().then(url => this.image = url);

    
     // Do something here when the data is succesfully uploaded!



    });
    }

    catch (e){
      let toast = this.toastCtrl.create({
      message: 'Para generar un link debes elegir una imágen',
      duration: 1500,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
    }

  }

}


