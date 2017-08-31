import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';


import { Clipboard } from '@ionic-native/clipboard';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { ImagePicker } from '@ionic-native/image-picker';

import { IonicStorageModule } from '@ionic/storage';

import { Base64 } from '@ionic-native/base64';

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
    HomePage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Clipboard,
    AdMobFree, 
    Base64
  ]
})
export class AppModule {}
