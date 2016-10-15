import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdviceService } from '../../services/advice-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  advice: string;
  constructor(public navCtrl: NavController, public adviceService: AdviceService) {

  }
  getNewAdvice() {
    this.adviceService.getAdvice().subscribe(
      response => {
        this.advice = '"' + response.slip.advice + '"';
      }, error => {
        throw new Error(error);
      }
    );
  }

}
