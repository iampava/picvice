import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChuckNorrisJokesService } from '../../services/chuck-noris-jokes-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  advice: string;
  constructor(public navCtrl: NavController, public adviceService: ChuckNorrisJokesService) {

  }
  getNewAdvice() {
    this.adviceService.getAdvice().subscribe(
      response => {
        this.advice = '"' + response.value + '"';
      }, error => {
        throw new Error(error);
      }
    );
  }

}
