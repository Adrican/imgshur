import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'firebase/storage';
import * as firebase from 'firebase/app'; // for typings
import { FirebaseApp } from 'angularfire2'; // for methods

import { Client } from '@rmp135/imgur'

import { ToastController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { readFileSync } from 'fs';
import { Clipboard } from '@ionic-native/clipboard';

import { LoadingController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

import { TutorialPage } from '../tutorial/tutorial';

import { Base64 } from '@ionic-native/base64';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {


  client = new Client({


  })


  items: FirebaseListObservable<any[]>;
  captureDataUrl: string;
  imageUpload: string;
  imageUploadGood: string;
  aux: number = 0;
  image: string = "LINK";
  buttonDisabled = true;
  buttonDisabledForo = true;
  spinnerCargaHide = true;
  public tap: number = 0;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private imagePicker: ImagePicker, db: AngularFireDatabase, private Camera: Camera, private firebase: FirebaseApp, public loadingCtrl: LoadingController, private clipboard: Clipboard, private base64: Base64) {
    
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
      for (var i = 0; i < results.length; i++) {-
          this.captureDataUrl = 'data:image/jpeg;base64,' + results[i];
      }
    }, (err) => { });
  }
   */
  


hacerFoto() {
  this.spinnerCargaHide = true;
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.Camera.DestinationType.DATA_URL,
      encodingType: this.Camera.EncodingType.JPEG,
      mediaType: this.Camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    };
    this.Camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      this.imageUpload = imageData;
      
      this.buttonDisabled = null;
    }, (err) => {
      // Handle error
    });
  }



  cogerImagen() {
  
  const cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.Camera.DestinationType.FILE_URI, 
    sourceType: this.Camera.PictureSourceType.PHOTOLIBRARY,
    correctOrientation: true,
    mediaType: this.Camera.MediaType.ALLMEDIA
    
  }
  this.spinnerCargaHide = false;

    this.Camera.getPicture(cameraOptions).then((imageData) => {
      
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      
      
      
      

      this.captureDataUrl = 'file://' + imageData;
      this.aux = 1;


  
      this.transformBase64();


      this.buttonDisabled = null;
      this.spinnerCargaHide = true;
      this.aux = 0;
      this.image = "LINK"
    }, (err) => {
      // Handle error
    }); 
}




  async subirImagen() {
    let loader = this.loadingCtrl.create({
      content: "Generando Link...",
    });
    try {
      
    
    loader.present();

    
    
    this.imageUploadGood = this.imageUpload.replace('data:image/*;charset=utf-8;base64,', '')
    await this.client.Image.upload(this.imageUploadGood, { type: 'base64', album: 'JmtEV' }).then((response) =>{
      this.image = response.data.link;

    });

    /* 

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
     */





    loader.dismiss();
    this.buttonDisabledForo = null;
    


    
    }

    catch (e){
      let toast = this.toastCtrl.create({
      message: 'Solo puedes subir archivos de imagen válidos (.gif, .png, etc...)',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
    loader.dismiss();

    this.buttonDisabled = true;
    this.buttonDisabledForo = true;

    }


  }

  
  transformBase64(){
  
    this.base64.encodeFile(this.captureDataUrl).then((base64File: string) => {
       this.imageUpload = base64File;
    }, (err) => {
      alert(err);
    });
    
    


      
    


    
    
  }

  subirImagenForos() {

    this.image = "[IMG]"+ this.image +"[/IMG]"
    this.clipboard.copy(this.image)
    
    
     // Do something here when the data is succesfully uploaded!
     this.buttonDisabledForo = true;
     this.copiedToast();
     


  }

  tapEvent(e) {
    this.tap++

  }


  verTutorial(){
    this.navCtrl.push(TutorialPage);
  }


}

