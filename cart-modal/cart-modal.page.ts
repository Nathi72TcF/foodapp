import { Component, OnInit, Renderer2 } from '@angular/core';
import { JJService, Product } from './../Service/jj.service';
import { ModalController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
declare var H: any;

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  db = firebase.database();

  // order data
  produtotal;

  // user data
  userId;
  diliveryPrice: number;

  lat;
  lng;

  price;
  amount;

  user = [];
  id;
  Account;
  Contacts;
  username;


  cart: Product[] = [];
  radDilivery;
  Dilivery;

  times: any;
  timeArray: any;
  period;

  platform = new H.service.Platform({
    'apikey': 'oY5rx7Tjez_y5Jf8x7XJvj7ZC6s3IMHfMAJzbxmo7ok'
  });
  defaultLayers = this.platform.createDefaultLayers();
  mapContainer = document.getElementById('map-container');
  map = document.getElementsByClassName('forum');

constructor(
    private JJ: JJService,
    private modalCTRL: ModalController,
    private alertCtrl: AlertController,
    public renderer: Renderer2,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private router: Router
    // private localNotifications: LocalNotifications
  ) {
    // this.db.collection('users').onSnapshot(snapshot => {
    //   this.user = [];
    //   snapshot.forEach(element => {
    //     let id = {};
    //     let username = {};
    //     let Contacts = {};
    //     let Account = {};

    //     id = this.id = element.id;
    //     username = this.username = element.data().username;
    //     Contacts = this.Contacts = element.data().Contacts;
    //     Account = this.Account = element.data().Account;

    //     // this.user = [];
    //     this.user.push({
    //       id: id,
    //       username: username,
    //       Contacts: Contacts,
    //       Account: Account,
    //     });
    //   });
    // });
   }

  ionViewWillEnter() {
      // this.hereMaps();
      setTimeout(() => {
        this.getLocation();
      }, 1000);
    }

ngOnInit() {
    this.cart = this.JJ.getCart();
    console.log(this.cart);
  }

decreaseCartItem(product) {
    this.JJ.decreaseProduct(product);
  }

increaseCartItem(product) {
    this.JJ.addProduct(product);
  }

removeCartItem(product) {
    this.JJ.removeProduct(product);
  }

DiliveryOption(event) {
  if (this.Dilivery = null) {
    this.Dilivery = "Dilivery not Selected";
  } else if (this.Dilivery = event.detail.value) {
    if (this.Dilivery = 1) {
      this.diliverypricez();
      }
  }
  console.log(this.Dilivery);
  // console.log(this.diliverypricez);
}

diliverypricez() {
  if (this.Dilivery = 1) {
    this.diliveryPrice = 10;
  } else {
    this.diliveryPrice = 0;
  }
  console.log('diliveryPrice', this.diliveryPrice);
}

getTotal() {
    // console.log('getTotal', this.cart.reduce((i, j) => i = j.price * j.amount, 0));
    // console.log('Price', this.cart.reduce((i, j) => i = j.price, 0));
    // console.log('Amount', this.cart.reduce((i, j) => i = j.amount, 0));
    this.price = this.cart.reduce((i, j) => j.price, 0);
    this.amount = this.cart.reduce((i, j) => j.amount, 0);
    // console.log(this.price);
    // console.log(this.amount);
    this.getProductTotal();
    return this.cart.reduce((i, j) => i = j.price * j.amount, 0);
  }

getProductTotal() {
  // // this.Dilivery
  // if (this.Dilivery === null) {
  //   this.Dilivery = 0;
  // }
  // if (this.Dilivery === undefined) {
  //   this.Dilivery = 0;
  // }
  // console.log(this.Dilivery);

  // // this.produtotal
  // if (this.produtotal === null) {
  //   this.produtotal = 0;
  // }
  // if (this.produtotal === undefined) {
  //   this.produtotal = 0;
  // }
  // // console.log(this.produtotal);
  //   // console.log('getProductTotal', this.produtotal);
  //   return this.produtotal = +this.Dilivery + +this.getProductTotal();
  }

close() {
    this.modalCTRL.dismiss();
  }

  async checkout() {
    // Perfom PayPal or Stripe checkout process
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'Your food is being prepared and will be Done as Soon as Possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCTRL.dismiss();
    });
    this.saveOrder();
    this.saveOrderhistory();
  }

  saveOrder() {
    this.JJ.saveOrder(
      // date,
      this.price,
      this.amount,
      // p.name,
      this.cart
    ).then(data => {
      this.router.navigate(['/home']);
      // this.presentToast();
    });
  }

  saveOrderhistory() {
    this.JJ.saveOrderhistory(
      // date,
      this.price,
      this.amount,
      // p.name,
      this.cart
    ).then(data => {
      // this.router.navigate(['/vieworder']);
      // this.presentToast();
    });
  }

  dilivery(event) {
    this.period = +event.detail.value;
    this.times = Array<number>(+event.detail.value);
    this.timeArray = Array<Date>();
    // console.log(this.period);
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  //  // Adds markers to the map highlighting the locations of the captials of
//  // France, Italy, Germany, Spain and the United Kingdom.
//  //
//  // @param  {H.Map} map      A HERE Map instance within the application
//  // code from here maps documentation example for geolocaton makers

// addMarkersToMap(map) { JJ Location https://www.latlong.net/
//   var parisMarker = new H.map.Marker({lat:48.8567, lng:2.3508});
//   map.addObject(parisMarker);

//   var romeMarker = new H.map.Marker({lat:41.9, lng: 12.5});
//   map.addObject(romeMarker);

//   var berlinMarker = new H.map.Marker({lat:52.5166, lng:13.3833});
//   map.addObject(berlinMarker);

//   var madridMarker = new H.map.Marker({lat:40.4, lng: -3.6833});
//   map.addObject(madridMarker);

//   var londonMarker = new H.map.Marker({lat:51.5008, lng:-0.1224});
//   map.addObject(londonMarker);
// }

  hereMaps(lat, lng) {
    var platform = new H.service.Platform({
      'apikey': 'oY5rx7Tjez_y5Jf8x7XJvj7ZC6s3IMHfMAJzbxmo7ok'
    });

    var defaultLayers = platform.createDefaultLayers();
    var svgMarkup = 'https://img.icons8.com/ios-filled/30/000000/taxi-location.png';
    /* if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition=>{
    console.log(showPosition);
  */
// Instantiate (and display) a map object:

    var map = new H.Map(document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
    zoom: 6,
    center: { lat: 48.8567, lng: 2.3508}
    });

    var icon = new H.map.Icon(svgMarkup),
    coords = { lat: lat, lng: lng },
           marker = new H.map.Marker(coords, { icon: icon });
      //   // this.mapCenter(map);
    map.addObject(marker);
    var mapEvents = new H.mapevents.MapEvents(map);
    var behavior = new H.mapevents.Behavior(mapEvents);
    var ui = H.ui.UI.createDefault(map, defaultLayers);
     /*      })
      } else {
    console.log('Error ');
      }  */
}

  getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      this.hereMaps(pos.coords.latitude, pos.coords.longitude);
    //  showPosition.coords.latitude
    });
    } else {
      console.log('My friend ', );
    // myCurrentLocation = "Geolocation is not supported by this browser.";
    }
    }

    segmentChanged(ev: any) {
      if (this.Dilivery = 1) {
        this.diliveryPrice = 10;
      } else {
        this.diliveryPrice = 0;
      }
      console.log('diliveryPrice', this.diliveryPrice);
      console.log('Segment changed', ev);
    }

// // Boilerplate map initialization code starts below:

// //Step 1: initialize communication with the platform
// // In your own code, replace variable window.apikey with your own apikey
// let platform = new H.service.Platform({
//   apikey: window.apikey
//   });
// var defaultLayers = platform.createDefaultLayers();

//   //Step 2: initialize a map - this map is centered over Europe
// var map = new H.Map(document.getElementById('map'),
//   defaultLayers.vector.normal.map,{
//   center: {lat:50, lng:5},
//   zoom: 4,
//   pixelRatio: window.devicePixelRatio || 1
//   });
//   // add a resize listener to make sure that the map occupies the whole container
// window.addEventListener('resize', () => map.getViewPort().resize());

//   //Step 3: make the map interactive
//   // MapEvents enables the event system
//   // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
// var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

//   // Create the default UI components
// var ui = H.ui.UI.createDefault(map, defaultLayers);

//   // Now use the map as required...
// window.onload = function () {
//   addMarkersToMap(map);
//   }

  // platform = new H.service.Platform({
  //   'apikey': 'KpHtVyBXb8V3qlmyUTVS4qYjsrCFLNJcwbiW3m_MmVE'
  // });
  // defaultLayers = this.platform.createDefaultLayers();
  // map = document.getElementsByClassName('forum');

  // DiliveryLocation() {
  //   // Instantiate a map and platform object:
  // var platform = new H.service.Platform({
  // 'apikey': '{C7JekzairWkkS1Fs2cZn}'
  // });
  // // Retrieve the target element for the map:
  // var targetElement = document.getElementById('mapContainer');

  // // Get default map types from the platform object:
  // var defaultLayers = platform.createDefaultLayers();

  // // Instantiate the map:
  // var map = new H.Map(
  // document.getElementById('mapContainer'),
  // defaultLayers.vector.normal.map,
  // {
  //   zoom: 10,
  //   center: { lat: 52.51, lng: 13.4 }
  // });

  // // Create the parameters for the geocoding request:
  // var geocodingParams = {
  //     searchText: '200 S Mathilda Ave, Sunnyvale, CA'
  //   };

  // // Define a callback function to process the geocoding response:
  // var onResult = function(result) {
  // var locations = result.Response.View[0].Result,
  //     position,
  //     marker;
  // // Add a marker for each location found
  // for (let i = 0;  i < locations.length; i++) {
  //   position = {
  //     lat: locations[i].Location.DisplayPosition.Latitude,
  //     lng: locations[i].Location.DisplayPosition.Longitude
  //   };
  //   marker = new H.map.Marker(position);
  //   map.addObject(marker);
  // }
  // };
  // // Get an instance of the geocoding service:
  // var geocoder = platform.getGeocodingService();
  // // Call the geocode method with the geocoding parameters,
  // // the callback and an error callback function (called if a
  // // communication error occurs):
  // geocoder.geocode(geocodingParams, onResult, function(e) {
  // alert(e);
  // });
  // }

  // DiliveryHereMaps() {
  //   // Instantiate a map and platform object:
  //     var platform = new H.service.Platform({
  //   'apikey': '{C7JekzairWkkS1Fs2cZn}'
  //   });
  //   // Retrieve the target element for the map:
  //     var targetElement = document.getElementById('mapContainer');

  //   // Get default map types from the platform object:
  //     var defaultLayers = platform.createDefaultLayers();

  //   // Instantiate the map:
  //     var map = new H.Map(
  //     document.getElementById('mapContainer'),
  //     defaultLayers.vector.normal.map,
  //     {
  //       zoom: 10,
  //       center: { lat: 52.51, lng: 13.4 }
  //     });

  //   // Create the parameters for the reverse geocoding request:
  //     var reverseGeocodingParameters = {
  //     prox: '52.5309,13.3847,150',
  //     mode: 'retrieveAddresses',
  //     maxresults: 1
  //   };

}
