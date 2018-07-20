import { Restangular } from "ngx-restangular";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
@Injectable()
export class MessageService {
  constructor(public restangular:Restangular){}

  getMessageByUser(user): Observable<any>{
    return this.restangular.one('api/me/messages',user.id).one('partner').get({paginate:100});
  }

  sendMessage(user,message){
    return this.restangular.one('api/me/messages',user).post('send',message);
  }
}