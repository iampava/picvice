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
    Camera.getPicture({sourceType: 1, quality: 100}).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.navCtrl.push(ResultPage, base64Image);
    }, (err) => {
      throw new Error("Camera error!")
    });
  }

}

