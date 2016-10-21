import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChuckNorrisJokesService } from '../../services/chuck-noris-jokes-service';
import { Base64ToGallery } from 'ionic-native';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  base64: string;
  initialText: string;
  image: HTMLImageElement;

  constructor(public navCtrl: NavController, public params: NavParams, public jokesService: ChuckNorrisJokesService, private elRef: ElementRef, private alertCtrl: AlertController) {
    this.base64 = params.data.base64;
    this.initialText = params.data.initialText;
    this.image = null;

  };

  ngOnInit() {
    let ionContentElement = new ElementRef(this.elRef.nativeElement.querySelector(".result-page__content")).nativeElement;

    this.canvas = <HTMLCanvasElement>document.getElementById("resultCanvas");
    this.canvas.width = ionContentElement.offsetWidth;
    this.canvas.height = ionContentElement.offsetHeight - 120;
    this.ctx = this.canvas.getContext("2d");

    this.image = new Image();
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.save();
      this.ctx.translate(0, 0);
      this.ctx.rotate(Math.PI / 2);
      this.ctx.font = "24px serif";
      this.ctx.fillStyle = 'white';

      this._drawText(this.initialText);

      this.ctx.restore();
    };
    this.image.src = this.base64;
  }

  getNewJoke() {
    this.jokesService.getAdvice().subscribe(
      response => {
        this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(0, 0);
        this.ctx.rotate(Math.PI / 2);
        this.ctx.font = "24px serif";
        this.ctx.fillStyle = 'white';

        this._drawText(response.value);

        this.ctx.restore();
      }, error => {
        throw new Error(error);
      }
    );
  }

  savePicture() {
    let base64Data = this.canvas.toDataURL("image/png");
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: '',
      buttons: [{
        text: 'ChuckMe',
        handler: data => {
          this.navCtrl.pop();
        }
      },]
    });
    Base64ToGallery.base64ToGallery(base64Data).then(
      res => {
        alert.setSubTitle("Hooray!!! Chuck Norris is in your phone!!!");
        alert.present();
      },
      err => {
        alert.setSubTitle("Chuck Norris doesn't want to be inside your phone! FUCK OFF!");
        alert.present();
      }
    );
  }

  _drawText(text) {
    let textWidth = this.ctx.measureText(text).width;
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 8;
    if (textWidth > this.canvas.height) {
      let splits = text.split(" "), firstPart = "", secondPart = "", i;
      for (i = 0; i < splits.length / 2; i++) {
        firstPart += splits[i] + " ";
      }
      while (i < splits.length) {
        secondPart += splits[i] + " ";
        i++;
      }

      this.ctx.strokeText(firstPart, 10, -this.canvas.width / 2, this.canvas.height - 10);
      this.ctx.strokeText(secondPart, 10, -this.canvas.width / 3, this.canvas.height - 10)

      this.ctx.fillText(firstPart, 10, -this.canvas.width / 2, this.canvas.height - 10);
      this.ctx.fillText(secondPart, 10, -this.canvas.width / 3, this.canvas.height - 10);
    } else {
      this.ctx.strokeText(text, 10, -this.canvas.width / 2, this.canvas.height - 10);
      this.ctx.fillText(text, 10, -this.canvas.width / 2, this.canvas.height - 10);
    }
  }
}
