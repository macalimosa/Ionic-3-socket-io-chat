import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Restangular } from 'ngx-restangular';
import { MessagePage } from '../message/message';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

  users:any;
  me:any;
  messagePage:any = MessagePage;
  constructor(public navCtrl: NavController,
    public restangular:Restangular,
    public chatService:ChatService,
    public userService:UserService) {
    this.chatService.joined().subscribe((data)=>{
      console.log('new user joined',data);
    })

    this.chatService.leave().subscribe((data)=>{
      console.log('leave user',data);
    })
  }

  ngOnInit(){
    this.restangular.all('api/users').get('').subscribe((response)=>{
       this.users = response.data.data;
       console.log('users',this.users);
    });
    this.me = this.userService.getUser().user;
    console.log('me',this.me);
    this.chatService.join({client:this.me.id,name:this.me.full_name});
  }
}
