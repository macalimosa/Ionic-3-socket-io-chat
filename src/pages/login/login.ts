import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Restangular } from 'ngx-restangular';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { UserService } from '../../services/user.service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public restangular:Restangular,
    public storage:Storage,
    public userService:UserService) {
  }

  ionViewDidLoad() {
    this.storage.get('token').then((token)=>{
      if(token){
        this.navCtrl.push(TabsPage)
      }
    });
  }

  onLogin(form:NgForm){
    let credentials = {
      grant_type: 'password',
      client_id: '2',
      client_secret: 'B44uIa7P1ieZCGpkLm0Wn8tweFi3nUgXrxrWPiNI',
      username: form.value.username,
      password: form.value.password
    }
    this.restangular.all('/oauth/token').post(credentials).subscribe((response) => {
      console.log('response',response);
      let token = response.access_token
      this.storage.set('token',token);
      this.navCtrl.push(TabsPage);

    })
  }

}
