import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResultPage } from '../pages/result/result';
import { ChuckNorrisJokesService } from '../services/chuck-noris-jokes-service';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '128221e6'
  },
  'push': {
    'sender_id': '484083244506',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434',
        'sound': true,
        'vibrate': true
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResultPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResultPage
  ],
  providers: [ChuckNorrisJokesService]
})
export class AppModule { }
