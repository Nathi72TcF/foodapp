import { Component, OnInit } from '@angular/core';
import { JJService } from './../Service/jj.service';
import { AuthService } from './../Service/auth.service';
import * as firebase from 'firebase';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupForm: FormGroup;
  public loading: any;

  // Password eye off
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(
    public jj: JJService,
    public formGroup: FormBuilder,
    public platform: Platform,
    public authService: AuthService,
    public router: Router,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public toastController: ToastController
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
   }

  ngOnInit() {
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async signupUser(signupForm: FormGroup): Promise<void> {
    console.log('Method is called');

    if (!signupForm.valid) {
      console.log(
        'Need to complete the form, current value: ',
        signupForm.value
      );
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;

      this.authService.signupUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            // this.router.navigateByUrl('profile');
            this.router.navigateByUrl('profile');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

   ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menuCtrl.enable(true);
  }

}
