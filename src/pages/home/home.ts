import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  constructor(public navCtrl: NavController,public storage:Storage,public userService:UserService) {

  }

  ngOnInit(){
    this.storage.get('token').then((token) =>{
      this.userService.getMe(token).subscribe((response) => {
        this.userService.setUser(response.data);
        console.log('me',response.data);
      })
    });
  }
  ionViewDidLoad(){
    
  }

}
