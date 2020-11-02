import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { JJService } from './Service/jj.service';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Orderz',
      url: '/vieworder',
      icon: 'alert'
    },
    {
      title: 'Past Orders',
      url: '/history',
      icon: 'alert'
    },
    {
      title: 'Calender',
      url: '/historyorder',
      icon: 'alert'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Log Out',
      url: '/login',
      icon: 'exit'
    },
  ];

    // declare here...
    userId;
    used;
    image;
    ID;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public loadingController: LoadingController,
    private JJ: JJService,
    public router: Router
  ) {
    this.getAuth();
    this.initializeApp();

    this.userId = this.JJ.UserInfor();
    /// if userId the loadData
    ///// getting user Auth
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          // User is signed in.
          this.ID = user.uid;
          this.loadData();
          // console.log(this.ID);
       } else {
      // No user is signed in.
         this.router.navigate(['/login']);
        }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#626969');
      this.splashScreen.hide();
    });
  }

  async loadData() {
    const loader = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'loading user Information...'
    });
    await loader.present();
    this.JJ.getUserInformation().then( getUserInformation => {
      this.used = getUserInformation;
    });
    // retrieving profile pic from service
    this.JJ.getUserProfile(this.ID).then( userPic => {
      if (userPic.profilePicUrl) {
        this.image = userPic.profilePicUrl;
      }
      console.log(userPic['profilePicUrl']);
    });
    loader.dismiss();
  }

  getAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.router.navigateByUrl('/home');
      }else {
        this.router.navigateByUrl('/login');
      }
      });
    }

}
