import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicImageViewerModule } from 'ionic-img-viewer';


import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { GamePage } from '../pages/game/game';
import { CatsPage } from '../pages/cats/cats';
import { DetailsCatPage } from '../pages/cats/details-cat/details-cat';

import { HttpProvider } from '../providers/http/http';

import { PreloadImgComponent } from '../components/preload-img/preload-img';



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    GamePage,
    CatsPage,
    DetailsCatPage,
    PreloadImgComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      scrollAssist: true,
      autoFocusAssist: true,
      tabsHideOnSubPages: true,
      platforms: {
        ios: {
          backButtonText: "",
        }
      },
      pageTransition: 'fade',
    }),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    BrowserModule,
    HttpModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    GamePage,
    CatsPage,
    DetailsCatPage,
    PreloadImgComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider
  ]
})
export class AppModule {}
