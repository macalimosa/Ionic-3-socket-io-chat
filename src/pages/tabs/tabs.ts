import { Component, OnInit } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public storage:Storage,public userService: UserService,public chatService:ChatService) {

  }
  ngOnInit(){
    
  }
}
