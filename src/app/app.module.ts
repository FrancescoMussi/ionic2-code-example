import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GameModal } from '../pages/game-modal/game-modal';
import { InfoModal } from '../pages/info-modal/info-modal';

import { ApiProvider } from '../providers/api-provider';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GameModal,
    InfoModal
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GameModal,
    InfoModal
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})


export class AppModule {}