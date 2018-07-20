import { Restangular } from "ngx-restangular";
import { Injectable } from "@angular/core";
@Injectable()
export class UserService{
  user:any;
  constructor(private restangular:Restangular){

  }
  getUser(){
    return this.user;
  }
  setUser(user){
    this.user = user;
  }

  getMe(token){
    return this.restangular.all('api/me').get('');
   
  }
}