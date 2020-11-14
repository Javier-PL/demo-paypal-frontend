import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paypal-web',
  templateUrl: './paypal-web.page.html',
  styleUrls: ['./paypal-web.page.scss'],
})
export class PaypalWebPage implements OnInit {

  paymentAmount: string = '';
  currency: string = 'EUR';
  currencyIcon: string = '€';

  constructor(private activatedRoute:ActivatedRoute) {
    let _this = this;
    setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
      <any>window['paypal'].Buttons({

        // Set up the transaction
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: _this.paymentAmount
              }
            }]
          });
        },

        // Finalize the transaction
        onApprove: function (data, actions) {
          return actions.order.capture()
            .then(function (details) {
              // Show a success message to the buyer
              alert('Transaction completed by ' + details.payer.name.given_name + '!');
              console.log(details)
            })
            .catch(err => {
              console.log(err);
            })
        }
      }).render('#paypal-button-container');
    }, 500)
  }


  ngOnInit() {
  }

  setAmount(amount){
    this.paymentAmount = amount
  }

}
