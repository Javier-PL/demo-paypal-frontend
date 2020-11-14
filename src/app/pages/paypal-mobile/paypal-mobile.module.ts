import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaypalMobilePageRoutingModule } from './paypal-mobile-routing.module';

import { PaypalMobilePage } from './paypal-mobile.page';

import { PayPal} from '@ionic-native/paypal/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaypalMobilePageRoutingModule
  ],
  declarations: [PaypalMobilePage],
  providers:[PayPal]
})
export class PaypalMobilePageModule {}
