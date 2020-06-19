import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { PostProvider } from '../providers/post-provider';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { IonicSelectableModule } from 'ionic-selectable';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SlidesPage } from '../pages/slides/slides';
import { IonicStorageModule } from '@ionic/Storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SlidesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicSelectableModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SlidesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    PostProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
