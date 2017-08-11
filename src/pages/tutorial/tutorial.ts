import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { HomePage } from '../home/home';

/**
 * Generated class for the TutorialPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  
  @ViewChild(Slides) slides: Slides;
    slidesList = [
    {
      title: "¡Bienvenido a imgshur!",
      description: "Para comenzar deberás elegir la imágen de tu galería o hacer una foto directamente.",
      image: "assets/diapogood1.png",
    },
    {
      title: "Generar el link",
      description: "Una vez hayas elegido la imágen, podrás generar el link pulsando en el botón correspondiente.",
      image: "assets/diapogood2.png",
    },
    {
      title: "Añadir etiquetas para foros",
      description: "Ahora, si quieres puedes añadir las etiquetas '[IMG][/IMG]' usada en los foros directamente pulsando en el botón correspondiente.",
      image: "assets/diapogood3.png",
    },
    {
      title: "Copiar el link",
      description: "Pulsando en el link generado, se copiará directamente al portapapeles para que solo tengas que pegarlo en tu post.",
      image: "assets/diapogood4.png",
    }
  ];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }


  goToSlide() {
    this.slides.slideTo(4, 500);
  }

  //Al contrario de this.navCtrl.push(HomePage); 'setRoot();' lo que hace es cambiar la página que se abrirá de inicio en el dispositivo

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
