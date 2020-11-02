import { CartModalPageModule } from './cart-modal/cart-modal.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import * as firebase from 'firebase';
import * as moment from 'moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA02BihP76MkgpjZJEg3LhZFkXfmF8ajVU",
  authDomain: "jj-tcf.firebaseapp.com",
  databaseURL: "https://jj-tcf.firebaseio.com",
  projectId: "jj-tcf",
  storageBucket: "jj-tcf.appspot.com",
  messagingSenderId: "943490278583",
  appId: "1:943490278583:web:3bae2bcf66450e493b9932",
  measurementId: "G-YHT2F7XBF3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CartModalPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    AndroidPermissions,
    File
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
