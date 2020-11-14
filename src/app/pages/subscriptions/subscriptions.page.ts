import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaypalService } from 'src/app/services/paypal.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.page.html',
  styleUrls: ['./subscriptions.page.scss'],
})
export class SubscriptionsPage implements OnInit {

  plan_id:string = "" 
  isPaypalShown:boolean = false

  products:any[]=[]
  plans:any[]=[]
  subscriptions:any[]=[]

  allowSubscribe:boolean = false


  constructor(private activatedRoute:ActivatedRoute, private paypalService:PaypalService, private subscriptionsService:SubscriptionsService,private router: Router) {

    this.doPayment()
  }


  ngOnInit() {

    this.paypalService.getProductsList().subscribe((data:any)=>{
      console.log(data)
      
      this.products =  data.products

      for(let product of this.products){

        this.paypalService.getPlansList(product.id).subscribe((data:any)=>{
          
          this.plans = data.plans.filter(plan => plan.status !== "INACTIVE")
          console.log(this.plans)


          this.subscriptionsService.getSubscriptions().subscribe((data:any)=>{
            this.subscriptions = data
            
            this.setSubbable()

            if(this.subscriptions != null && this.subscriptions.length>0){
              this.checkSubscriptionStatus()
            }
            

          },err=>{console.log(err)})


        },err=>{console.log(err)})

      }

      
    },err=>{console.log(err)})

    
    
  }

  selectPlan(plan_id:string){
    this.plan_id = plan_id
    this.isPaypalShown = true
  }

  

  setSubbable(){

    if (this.subscriptions==null || this.subscriptions.length == 0 ){
      
      this.allowSubscribe = true

      return
    }

    for(let plan of this.plans){
     for (let sub of this.subscriptions){
          if(plan.id == sub.planID){
            sub.name = plan.name
            this.allowSubscribe = false
            return
          }
     }
     
    }

    return
  }

  cancelSubscription(subscriptionID:string){
    this.paypalService.cancelSubscription(subscriptionID).subscribe((data:any)=>{
      console.log(data)
      if(data === null){
        console.log("unsubscribed")

        this.subscriptionsService.deleteSubscription(subscriptionID).subscribe((data:any)=>{
          console.log(data)
          
          this.ngOnInit()

        },err=>{console.log(err)})
      }
    },err=>{console.log(err)})
  }



  doPayment(){

  
    let _this = this;
    setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
      <any>window['paypal'].Buttons({


        // Set up the subscription
        createSubscription: function(data, actions) {
          if(!_this.allowSubscribe || _this.plan_id === ""){
            console.log("HEY U ARE SUBSCIBED")
            return null;
          } 
          
          return actions.subscription.create({
      
            plan_id: _this.plan_id
      
          });
      
        },

         // Finalize the subscription
        onApprove: function(data, actions) {

          alert('You have successfully created subscription ' + data.subscriptionID);

          const subscriptionData = {
            subscriptionID:data.subscriptionID,
            planID: _this.plan_id
          }
          _this.subscriptionsService.postSubscription(subscriptionData).subscribe((data:any)=>{
            console.log(data)

            _this.plan_id=""
            
             _this.ngOnInit()

          },err=>{console.log(err)})
      
        }

      }).render('#paypal-button-container');
    }, 500)
  }


  checkSubscriptionStatus(){
    for(let sub of this.subscriptions){
      this.paypalService.getSubscriptionDetails(sub.subscriptionID).subscribe((data:any)=>{
 

        if(data.status = "CANCELLED"){
          this.subscriptionsService.deleteSubscription(sub.subscriptionID).subscribe((data:any)=>{
  
            sub.delete = true
            this.subscriptions = this.subscriptions.filter(sub => sub.delete == true);
            
          },err=>{console.log(err)})
        }
      },err=>{})
    }
  }

}
