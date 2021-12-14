import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

    baseUrl=environment.baseUrl;

    constructor(private http:HttpClient) { }

    setOptions(){
      const httpOptions={
        headers:new HttpHeaders({
          Authorization:'Bearer '+localStorage.getItem('token')
        })
      }
      return httpOptions;
    }

    addReview(review:Review){
      const httpOptions=this.setOptions();
      return this.http.post(this.baseUrl+'/review/add',review,httpOptions)
    }


}
