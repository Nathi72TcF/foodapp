import { CartModalPage } from './../cart-modal/cart-modal.page';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JJService } from './../Service/jj.service';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cart = [];
  product = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor(
    private JJ: JJService,
    private modalCTRL: ModalController
  ) {}

  ngOnInit() {
    this.product = this.JJ.getProduct();
    this.cart = this.JJ.getCart();
    this.cartItemCount = this.JJ.getCartItemCount();
    console.log(this.cart);
  }

  addToCart(product) {
    this.JJ.addProduct(product);
    this.animateCSS('tada');
  }

  async openCart() {
    this.animateCSS('bounceOutLeft', true);
    let modal =  await this.modalCTRL.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
      this.animateCSS('bounceInLeft');
    });
    modal.present();
  }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)
    
    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }

}
