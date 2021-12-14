import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserForModify } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ModifyService {

  baseUrl=environment.baseUrl;

  constructor(private http:HttpClient) { }

  getUser(username:string){
    return this.http.get(this.baseUrl+'/account/user/'+username);
  }

  modifyProfile(username:string,userforModify:UserForModify){
    return this.http.put(this.baseUrl+'/account/user/'+username,userforModify);
  }

}
