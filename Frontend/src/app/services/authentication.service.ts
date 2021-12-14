import { Injectable } from '@angular/core';
import { UserForLogin, UserForRegister } from '../model/user';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) { }

  authUser(user:UserForLogin){
      return this.http.post(this.baseUrl+'/account/login',user);
  }

  registerUser(user:UserForRegister){
      return this.http.post(this.baseUrl+'/account/register',user);
  }


}
