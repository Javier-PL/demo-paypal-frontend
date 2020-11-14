import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  API_URL = "https://demo-paypal-backend3.herokuapp.com" //"http://localhost:8082"

  constructor(private http: HttpClient) { }

  

  getProductsList() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});  
    return this.http.get(this.API_URL+'/paypal/products', { headers: headers })
  }

  getPlansList(searchparam) {

    let params = new HttpParams().set("product_id",searchparam)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});  
    return this.http.get(this.API_URL+'/paypal/plans', { headers: headers, params: params })
  }

  cancelSubscription(searchparam) {

    let params = new HttpParams().set("subscriptionID",searchparam)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});  
    return this.http.post(this.API_URL+'/paypal/sub/cancel', null,{ headers: headers, params: params })
  }

  getSubscriptionDetails(searchparam) {

    let params = new HttpParams().set("subscriptionID",searchparam)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});  
    return this.http.get(this.API_URL+'/paypal/sub/details',{ headers: headers, params: params })
  }

 

}
