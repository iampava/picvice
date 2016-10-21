import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  ngOnInit() {
    this.elRef.nativeElement.querySelector("#getPictureInput").addEventListener('change', (event) => {
      setTimeout(() => {
        this.navCtrl.push(ResultPage, {image: this.elRef.nativeElement.querySelector("#getPictureInput").files[0], initialText: this.advice});
      }, 300);
    });
  }

  getPicture() {
    this.elRef.nativeElement.querySelector("#getPictureInput").click();
  }

}