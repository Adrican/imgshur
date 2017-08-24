import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'firebase/storage';
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods

import { ToastController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Clipboard } from '@ionic-native/clipboard';

import { LoadingController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { TutorialPage } from '../tutorial/tutorial';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  items: FirebaseListObservable<any[]>;
  captureDataUrl: string;
  aux: number = 0;
  image: string = "LINK";
  buttonDisabled = true;
  buttonDisabledForo = true;
  spinnerCargaHide = true;
  public tap: number = 0;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private imagePicker: ImagePicker, db: AngularFireDatabase, private Camera: Camera, private firebase: FirebaseApp, public loadingCtrl: LoadingController, private clipboard: Clipboard) {
    
    this.items = db.list('/items');


  
  }

  copiedToast() {
    this.clipboard.copy(this.image)
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
      quality: 25,
      destinationType: this.Camera.DestinationType.DATA_URL,
      encodingType: this.Camera.EncodingType.JPEG,
      mediaType: this.Camera.MediaType.PICTURE,
    };
    this.Camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      
      this.buttonDisabled = null;
    }, (err) => {
      // Handle error
    });
  }



  cogerImagen() {
  
  const cameraOptions: CameraOptions = {
    quality: 25,
    destinationType: this.Camera.DestinationType.DATA_URL, 
    encodingType: this.Camera.EncodingType.JPEG,  
    sourceType: this.Camera.PictureSourceType.PHOTOLIBRARY,
    correctOrientation: true
    
  }
  this.spinnerCargaHide = false;

    this.Camera.getPicture(cameraOptions).then((imageData) => {
      
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      
      
      

      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      this.aux = 1;
      
      this.buttonDisabled = null;
      this.spinnerCargaHide = true;
      this.aux = 0;
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
      duration: 3000
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

    this.buttonDisabledForo = null;


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

  subirImagenForos() {

    this.image = "[IMG]"+ this.image +"[/IMG]"
    
     // Do something here when the data is succesfully uploaded!


  }

  tapEvent(e) {
    this.tap++

  }


  verTutorial(){
    this.navCtrl.push(TutorialPage);
  }


}

