import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Clipboard } from '@ionic-native/clipboard';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ImagePicker } from '@ionic-native/image-picker';

var firebaseConfig = {
    apiKey: "AIzaSyB-dS_BwzFNGTgZ1HDmlokGgis4i6GUlnE",
    authDomain: "imgshur.firebaseapp.com",
    databaseURL: "https://imgshur.firebaseio.com",
    projectId: "imgshur",
    storageBucket: "imgshur.appspot.com",
    messagingSenderId: "449261701468"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Clipboard
  ]
})
export class AppModule {}
