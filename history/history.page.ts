import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JJService } from './../Service/jj.service';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  db = firebase.firestore();

  date;
  Date;
  idz;
  customerID;
  OrderStatus;
  food = {};
  foods = [];
  foodss = [];
  Orders = [];

  amount;
  desc;
  price;
  id;
  pic;

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    console.log(ev.detail.value);
    if (ev.detail.value = 'historyorders') {
      this.router.navigate(['/historyorder']);
    }
  }

  constructor(
    private JJ: JJService,
    private router: Router,
    public modalController: ModalController
  ) {
    this.db.collection('/historyOderz').doc(firebase.auth().currentUser.uid).collection('Order').orderBy('Date', "desc").onSnapshot(snapshot => {
      this.Orders = [];
      snapshot.forEach(element => {
        // console.log(element.data());
        let date = {};
        let OrderStatus = {};
        let food = {};
        let idz = {};
        let customerID = {};

        idz = this.idz = element.id;
        date = this.date = element.data().Date;
        OrderStatus = this.OrderStatus = element.data().OrderStatus;
        customerID = this.customerID = element.data().customer;
        food = this.food = element.data().food;

        this.Orders.push({
          id: this.idz,
          date: this.date,
          OrderStatus: this.OrderStatus,
          customerID: this.customerID,
          food: this.food
        });
        // console.log(date);
        // console.log(OrderStatus);
        // console.log(food);

        this.foods.push(this.food)
        console.log(this.foods);
      });

      for (let key in this.foods) {
        console.log(key);
        this.amount = this.foods[key]
        this.foodss.push(this.foods[key])
        console.log(this.foodss);
      }

    });

   }

  ngOnInit() {
    
  }

}
