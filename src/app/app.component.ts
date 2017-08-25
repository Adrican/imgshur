import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';


import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, private admobFree: AdMobFree) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.storage.get('introShown').then((result) => {
        
               if(result){
                 this.rootPage = HomePage;
               } else {
                 this.rootPage = TutorialPage;
                 this.storage.set('introShown', true);
               }
        
               
        
             });
      
             const bannerConfig: AdMobFreeBannerConfig = {
              id: 'ca-app-pub-2595598708720153/4569127917',
              // for the sake of this example we will just use the test config
              isTesting: false,
              autoShow: true
             };
             this.admobFree.banner.config(bannerConfig);
        
             this.admobFree.banner.prepare()
             .then(() => {
               // banner Ad is ready
               // if we set autoShow to false, then we will need to call the show method here
             })
             .catch(e => console.log(e));
    });

  }
}

