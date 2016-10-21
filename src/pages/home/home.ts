import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { ChuckNorrisJokesService } from '../../services/chuck-noris-jokes-service';
import { ResultPage } from '../result/result';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  advice: string;
  constructor(public navCtrl: NavController, public jokesService: ChuckNorrisJokesService, private elRef: ElementRef) {
    this.advice = "";
  }
  getNewJoke() {
    this.jokesService.getAdvice().subscribe(
      response => {
        this.advice = '"' + response.value + '"';
      }, error => {
        throw new Error(error);
      }
    );
  }

  getPicture() {
    Camera.getPicture({ encodingType: Camera.EncodingType.PNG, sourceType: 1, destinationType: Camera.DestinationType.DATA_URL, quality: 1}).then((imageData) => {

      let base64Image = 'data:image/png;base64,' + imageData;
      setTimeout(() => {
        this.navCtrl.push(ResultPage, { base64: base64Image, initialText: this.advice });

      }, 1000);
    }, (err) => {
      throw new Error("Camera error!")
    });
  }

}

