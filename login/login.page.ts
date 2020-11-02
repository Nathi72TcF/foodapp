import { Component, OnInit } from '@angular/core';
import { JJService } from './../Service/jj.service';
import { MenuController } from '@ionic/angular';
import * as firebase from 'firebase';

import { AlertController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {ProfilePage} from '../profile/profile.page'
import { ResetPasswordPage } from '../reset-password/reset-password.page';
import { AuthService } from './../Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  db = firebase.firestore();

  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;
  email: string;
  password: string;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    public jj: JJService,
    private router: Router,
    public menuCtrl: MenuController,
    public Alert: AlertController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private FormsModule: FormsModule,
    public modalController: ModalController,
    private authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
   }

  ngOnInit() {
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  // //modal for reset password page
  // async presentModal() {
  //   const modal = await this.modalController.create({
  //     component: ResetPasswordPage,
  //     cssClass: 'resetModal'
  //   });
  //   return await modal.present();
  // }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ResetPasswordPage
    });
    return await modal.present();
  }

  resetPassword() {
    this.router.navigate(['reset-password']);
  }
  
 //modal for profile page
 async presentProfileModal() {
  const modal = await this.modalController.create({
    component: ProfilePage,
    cssClass: 'profileModal'
  });
  return await modal.present();
}

async loginUser(loginForm: FormGroup): Promise<void> {
  if (!loginForm.valid) {
    console.log('Form is not valid yet, current value:', loginForm.value);
  } else {
    let loading = await this.loadingCtrl.create();
    await loading.present();
    setTimeout(() => {
      loading.dismiss();
    },
  4000);

    const email = loginForm.value.email;
    const password = loginForm.value.password;
    this.authService.loginUser(email, password).then(
      (user) => {
        firebase.auth().onAuthStateChanged(user => {
          if (user.uid) {
            this.db.collection('users').where('userid', '==', user.uid).get().then(res => {
              if (res.empty) {
                // this.loading.dismiss();
                this.router.navigate(['profile']);
              } else {
                // this.loading.dismiss()
                this.router.navigate(['home']);
              }
            });
          }
        });
      },
          async (error) => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
          }
        );

      }
      this.loginForm.reset()
    }


    goToRegister() {
      this.router.navigate(['signup']);
    }

    ionViewWillEnter() {
      this.menuCtrl.enable(false);
    }

    ionViewDidLeave() {
      // enable the root left menu when leaving the tutorial page
      this.menuCtrl.enable(true);
    }

/////////////////////////////////////////////////////////////////////////////////////////////////

//   setUser(res: any) {
//     throw new Error("Method not implemented.");
//   }

//   hideShowPassword() {
//     this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
//     this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
//   }

//   login() {
//     this.jj.login(this.email, this.password).then(data => {
//       if (data.operationType === "signIn") {
//         this.router.navigate(['/home']);
//         // this.presentToast();
//       } else {
//         // this.presentAlert(data);
//       }
//     });
//     // this.presentLoading();
//   }
// ​
//   async resetPassword() {
//     let alert = await this.Alert.create({
//       header: 'Reset Password!',
//       inputs: [{
//         name: 'Email',
//         type: 'email',
//         placeholder: 'Please enter your email address'
//       }],
//       buttons: [{
//         text: 'cancel',
//         handler: () => {
//         }
//       }, {
//         text: 'send',
//         handler: (email) => {
//           this.jj.resetepassword(this.email);
//         }
//       }]
//     });
//     // await alert.present();
//   }

//   ionViewWillEnter() {
//     this.menuCtrl.enable(false);
//    }

//    ionViewDidLeave() {
//     // enable the root left menu when leaving the tutorial page
//     this.menuCtrl.enable(true);
//   }

}
