import { Injectable } from "@angular/core";
import { Socket } from 'ng-socket-io';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChatService {
 
  constructor(private socket:Socket){

  }
  getMessages(){
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log('data',data);
        observer.next(data);
      });
    })
    return observable;
  }
  getMessageNotification(){
    let observable = new Observable(observer => {
      this.socket.on('notification', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  startConversation(user){
    this.socket.emit('conversation',user);
  }

  join(user){
    this.socket.connect();
    this.socket.emit('join',user);
  }

  joined(){
    let observable = new Observable(observer => {
      this.socket.on('joined', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  leave(){
    let observable = new Observable(observer => {
      this.socket.on('leave', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }
  
}