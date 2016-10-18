import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChuckNorrisJokesService } from '../../services/chuck-noris-jokes-service';

@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  fileData: any;
  image: HTMLImageElement;
  imageData: string;

  constructor(public navCtrl: NavController, public params: NavParams, public jokesService: ChuckNorrisJokesService, private elRef: ElementRef) {
    this.fileData = params.data;
    this.image = null;

  };

  ngOnInit() {
    let ionContentElement = new ElementRef(this.elRef.nativeElement.querySelector(".result-page__content")).nativeElement;

    this.canvas = <HTMLCanvasElement>document.getElementById("resultCanvas");
    this.canvas.width = ionContentElement.offsetWidth;
    this.canvas.height = ionContentElement.offsetHeight - 120;
    this.ctx = this.canvas.getContext("2d");

    var reader = new FileReader();
    reader.onload = (event) => {
      var img = new Image();
      img.onload = () => {
        this.image = img;
        this.ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.canvas.width, this.canvas.height);
        this.imageData = this.canvas.toDataURL();
      }
      img.src = event.target['result'];
    }
    reader.readAsDataURL(this.fileData);
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

        let textWidth = this.ctx.measureText(response.value).width;
        if (textWidth > this.canvas.height) {
          let splits = response.value.split(" "), firstPart = "", secondPart = "", i;
          for (i = 0; i < splits.length / 2; i++) {
            firstPart += splits[i] + " ";
          }
          while (i < splits.length) {
            secondPart += splits[i] + " ";
            i++;
          }
          this.ctx.fillText(firstPart, 10, -this.canvas.width / 2, this.canvas.height - 10);
          this.ctx.fillText(secondPart, 10, -this.canvas.width / 3, this.canvas.height - 10);
        } else {
          this.ctx.fillText(response.value, 10, -this.canvas.width / 2, this.canvas.height - 10);
        }

        this.ctx.restore();
        this.imageData = this.canvas.toDataURL();
      }, error => {
        throw new Error(error);
      }
    );
  }
}
