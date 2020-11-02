// import { Product } from './jj.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ninvoke } from 'q';
import { BehaviorSubject } from 'rxjs';
import { fromValue } from 'long';
import { Router } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HttpClient} from '@angular/common/http';
import { resolve } from 'url';
import * as moment from 'moment';

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  pic: string;
  desc: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class JJService {

  db = firebase.firestore();

  userUID;
  userId;
  userDocumentNo;
  email;

  userzArray;
  userNamez;
  userSurname;
  userEmail;

  data: Product[] = [
    {id: 0, name: 'Nike', price: 10, amount: 1, pic: 'Nike.jpeg', desc: "Chips, Polony, Chakalaka / Atchaar", rating: 0},
    {id: 1, name: 'Adidas', price: 12, amount: 1, pic: 'Adidas.jpeg', desc: "Chips, Polony, Chakalaka / Atchaar, Lettuce", rating: 0},
    {id: 2, name: 'Puma', price: 14, amount: 1, pic: 'Puma.jpeg', desc: "Chips, Polony, Chakalaka / Atchaar, Lettuce, Cheese, Tomato, Fried Onion", rating: 0},
    {id: 3, name: 'GrassHooper', price: 20, amount: 1, pic: 'Soviet.jpeg', desc: "Chips, Polony, Chakalaka / Atchaar, Lettuce, Cheese, Tomato, Fried Onion, Egg, Viana, Russian", rating: 0},
    {id: 4, name: 'Soviet', price: 25, amount: 1, pic: 'Soviet.jpeg', desc: "Chips, Polony, Chakalaka / Atchaar, Lettuce, Cheese, Tomato, Fried Onion, Egg, Viana, Russian", rating: 0},
    {id: 5, name: 'Vans', price: 30, amount: 1, pic: 'Vans.jpeg', desc: "Chips, Polony, Chakalaka / Atchaar, Lettuce, Cheese, Tomato, Fried Onion, Egg, Viana, Russian, Burger, Special Source", rating: 0},
    {id: 6, name: 'Bathu', price: 35, amount: 1, pic: 'Bathu.jpeg', desc: "Chips, Polony, Chakalaka / Atchaar, Lettuce, Cheese, Tomato, Caramelised Fried Onion, Egg, Viana, Russian, Burger, Fried Paper", rating: 0},
    {id: 7, name: 'Superga', price: 40, amount: 1, pic: 'Superga.jpeg', desc: "Chips, Polony, Chakalaka / Atchaar, Lettuce, Cheese, Tomato, Caramelised Fried Onion, Egg, Viana, Russian, Burger, Fried Paper, Special Source", rating: 0},
    {id: 8, name: 'Fila', price: 50, amount: 1, pic: 'Fila.jpeg', desc: "Chips, Polony, Chakalaka / Atchaar, Lettuce, Cheese, Tomato, Fried Onion, Egg, Viana, Russian, Burger, Fried Paper, Fish Fingers, Special Source, Salsa Salad, Salad Cheese, cheese Source", rating: 0},
    {id: 9, name: 'Air Force', price: 55, amount: 1, pic: 'Airforce.jpeg', desc: "Chips, Polony, Chakalaka / Atchaar, Lettuce, Cheese, Tomato, Fried Onion, Egg, Viana, Russian, Burger, Fried Paper, Fish Fingers, Special Source, Salsa Salad, Salad Cheese, cheese Source, Caramelised Fried Onion", rating: 0},
    {id: 10, name: 'Jordan', price: 60, amount: 1, pic: 'Jordan.jpeg', desc: "Chips, Polony, Chakalaka / Atchaar, Lettuce, Cheese, Tomato, Fried Onion, Egg, Viana, Russian, Burger, Fried Paper, Fish Fingers, Special Source, Salsa Salad, Salad Cheese, cheese Source, Caramelised Fried Onion, Mushrooms", rating: 0},
    {id: 11, name: 'All Star', price: 65, amount: 1, pic: 'All star.jpeg', desc: "Chips, Polony, Chakalaka / Atchaar, Lettuce, Cheese, Tomato, Fried Onion, Egg, Viana, Russian, Burger, Fried Paper, Fish Fingers, Special Source, Salsa Salad, Salad Cheese, cheese Source, Caramelised Fried Onion, Mushrooms, Pineapple", rating: 0},
    {id: 12, name: 'Small Chips', price: 15, amount: 1, pic: 'chips.jpeg', desc: 'Small Chips', rating: 0},
    {id: 13, name: 'Medium Chips', price: 25, amount: 1, pic: 'chips.jpeg', desc: 'Medium Chips', rating: 0},
    {id: 14, name: 'Large Chips', price: 30, amount: 1, pic: 'chips.jpeg', desc: 'Large Chips', rating: 0},
    {id: 15, name: 'Small Milkshake', price: 15, amount: 1, pic: 'milkshake.jpg', desc: 'Small Milkshake', rating: 0},
    {id: 16, name: 'Medium Milkshake', price: 25, amount: 1, pic: 'milkshake.jpg', desc: 'Medium Milkshake', rating: 0},
    {id: 17, name: 'Large Milkshake', price: 30, amount: 1, pic: 'milkshake.jpg', desc: 'Large Milkshake', rating: 0},
  ];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor(
    private router: Router,
    private http: HttpClient,
    public androidPermissions: AndroidPermissions
  ) { }

   // log in, sign up and register code
   login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then((results) => {
      if (results) {
        this.userUID = results['user'].uid;
        // this.userDocumentNo = results['user'].uid;
      }
      return results;
    }).catch((error) => {
      var errorCode = error.code;
      var errorCode = error.message;
      return errorCode;
    });
  }

  signup(email, password, name, surname, contacts) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      if (user) {
        this.userId = user['user'].uid;
        this.userDocumentNo = user['user'].uid;
        this.email = user['user'].email;
        console.log(this.userDocumentNo);

      // inserting into database
        firebase.firestore().collection('users/').doc(this.userId).set({
        username: name,
        surnamez: surname,
        emails: email,
        Contacts: contacts,
        SuspendStatus: false,
        hasProfilePic: false,
        Account: 0,
        });
      }
      return user;
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
      // ...resetepassword
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      console.log('Sign-out successful.');

      // Sign-out successful.
    }).catch((error) => {
      console.log('An error happened.');
      // An error happened.
    });
  }

  resetepassword(email) {
    const auth = firebase.auth();

    auth.sendPasswordResetEmail(email.Email).then(() => {
    // Email sent.
    }).catch((error) => {
      // An error happened.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  getUserInformation() {
    return new Promise ((resolve) => {
      this.userzArray = [];
      const rootRef = firebase.database().ref('users/' + this.userDocumentNo);
      // console.log(this.userDocumentNo);
      rootRef.on('value', (data) => {
      const userzz = data.val();
      this.userNamez = userzz.username;
      this.userSurname = userzz.surnamez;
      this.userEmail = userzz.emails;
      this.userzArray.push({
        name: this.userNamez,
        surname: this.userSurname,
        email: this.userEmail
        // userzz
      });
      resolve(this.userzArray);
    });
      // return this.userzArray;
    });
  }

  signedIn() {
    return new Promise((resolve, reject) => {
     firebase.auth().onAuthStateChanged((user) => {
       if (user) {
           // User is signed in.
           resolve( user.uid);
           // console.log(this.ID);
        } else {
       //No user is signed in.
         //  this.router.navigate(['/login']);
         }
     });
    });
   }

  saveProfilePic(image) {
    this.signedIn().then((userID) => {
      let storageRef = firebase.storage().ref('usersProfilePic/' + userID);
      let rootRef = firebase.database().ref('users/' + this.userUID + '/hasProfilePic');
      console.log(storageRef);
      console.log(image);

      return storageRef.put(image).then( (data) => {
        console.log("saved to database");
        console.log(data);
        return rootRef.set(true);
      });
    });
    }

   getUserProfile(userId) {
     return firebase.database().ref("users/" + this.userId).once('value').then(snapshot => {
       let profile = snapshot.val();
       console.log(profile.hasProfilePic);
       if (profile.hasProfilePic) {
         console.log("has a profile pic");

         return firebase.storage().ref('usersProfilePic/' + this.userId).getDownloadURL().then( url => {
           profile['profilePicUrl'] = url;
           return profile;
         });
       } else {
         console.log("do not haves a profile pic");
         profile['profilePicUrl'] = 'assets/images/cool-avatar.png';
         return profile;
       }
     });
   }

 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // login gaurd

 UserInfor() {
   firebase.auth().onAuthStateChanged((user) => {
     if (user) {
       this.userUID = user.uid;
     } else {
       // No user is signed in.
     }
   });
   return this.userUID;
 }

 // Edit User Information
edituserName(usered) {
  const index = this.userzArray.indexOf(usered);
  const profname = prompt('Edit Name', usered.name);
  if (profname != null ) {
    this.userzArray[index].name = profname;
  }
}
edituserSurname(usered) {
  const index = this.userzArray.indexOf(usered);
  const profsurname = prompt('Edit Surname', usered.surname);
  if (profsurname != null ) {
    this.userzArray[index].surname = profsurname;
  }
}
edituserAge(usered) {
  const index = this.userzArray.indexOf(usered);
  const profage = prompt('Edit Age', usered.age);
  if (profage != null ) {
    this.userzArray[index].age = profage;
  }
}
edituserContact(usered) {
  const index = this.userzArray.indexOf(usered);
  const profcontact = prompt('Edit Contact', usered.contact);
  if (profcontact != null ) {
    this.userzArray[index].contact = profcontact;
  }
}
edituserEmail(usered) {
  const index = this.userzArray.indexOf(usered);
  const profemail = prompt('Edit Email', usered.email);
  if (profemail != null ) {
    this.userzArray[index].email = profemail;
  }
}

 //////////////////////////////////////////////////////////////////
  // cart code
  getProduct() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1 );
  }

  decreaseProduct(product) {
    for (let [index, p ] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
}

  removeProduct(product) {
    for (let [index, p ] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////// 

  saveOrder(price, amount, cart) {
    return firebase.firestore().collection('Oderz/').doc(firebase.auth().currentUser.uid).collection('Order').doc().set({
      Date: moment(new Date()).format('MMMM DD YYYY, h:mm'),
      // Price: price,
      // Amount: amount,
      food: cart,
      customer: firebase.auth().currentUser.uid,
      OrderStatus: 'Order Recieved',
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
    });
  }

  saveOrderhistory(price, amount, cart) {
    return firebase.firestore().collection('historyOderz/').doc(firebase.auth().currentUser.uid).collection('Order').doc().set({
      Date: moment(new Date()).format('MMMM DD YYYY, h:mm'),
      // Price: price,
      // Amount: amount,
      food: cart,
      customer: firebase.auth().currentUser.uid,
      // OrderStatus: 'Order Recieved',
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
    });
  }

}
