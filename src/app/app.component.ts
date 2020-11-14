import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  platformtype="mobile"
  public appPages = [
    /*{
      title: 'PayWeb',
      url: '/paypal-web',
      icon: 'mail'
    },*/
    {
      title: 'Home',
      url: '/home',
      icon: 'chevron-forward'
    },
    {
      title: 'Payments',
      url: '/paypal-web',
      icon: 'chevron-forward'
    },
    {
      title: 'Subscriptions',
      url: '/subscriptions',
      icon: 'chevron-forward'
    }

  ];
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

   
  }

  ngOnInit() {

  }
}
