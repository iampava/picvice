import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { ChuckNorrisJokesService } from '../../services/chuck-noris-jokes-service';
import { ResultPage } from '../result/result';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  advice: string;
  constructor(public navCtrl: NavController, public jokesService: ChuckNorrisJokesService) {
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
    Camera.getPicture({ encodingType: Camera.EncodingType.JPEG, sourceType: 1, destinationType: Camera.DestinationType.DATA_URL, quality: 30 }).then((imageData) => {

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let timer = Observable.timer(10);
      timer.subscribe(t => {
        this.navCtrl.push(ResultPage, { base64: base64Image, initialText: this.advice });

      });
    }, (err) => {
      throw new Error("Camera error!")
    });
  }

}

