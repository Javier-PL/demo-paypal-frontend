import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

 
  API_URL = "https://demo-paypal-backend3.herokuapp.com"///"http://localhost:8082"

  constructor(private http: HttpClient) { }

  postSubscription(body) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});  
    return this.http.post(this.API_URL+'/subscription/p', body, { headers: headers })
  }
  
  getSubscriptions() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});  
    return this.http.get(this.API_URL+'/subscriptions/g', { headers: headers })
  }

  deleteSubscription(searchparam) {

    let params = new HttpParams().set("subscriptionID",searchparam)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8'});  
    return this.http.delete(this.API_URL+'/subscription/d',{ headers: headers, params: params })
  }

}



