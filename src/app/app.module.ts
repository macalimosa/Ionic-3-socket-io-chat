import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RestangularModule } from 'ngx-restangular';
import { RestangularConfigFactory } from '../configs/restangular.config';
import { MessagePage } from '../pages/message/message';
import { MessageService } from '../services/message.service';
import {SocketIoConfig, SocketIoModule} from 'ng-socket-io';
import { ChatService } from '../services/chat.service';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { UserService } from '../services/user.service';
import {EmojiProvider} from '../provinders/emoji'
import { EmojiPickerComponent } from '../components/emoji-picker/emoji-picker';
import { TextAvatarDirective } from '../directives/text-avatar/text-avatar';
import { RelativeTimePipe } from '../pipes/relative-time/relative-time';
const socketIoConfig: SocketIoConfig = { url: 'http://127.0.0.1:8890', options: { }};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MessagePage,
    LoginPage,
    EmojiPickerComponent,
    TextAvatarDirective,
    RelativeTimePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RestangularModule.forRoot([Storage],RestangularConfigFactory),
    SocketIoModule.forRoot(socketIoConfig),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MessagePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MessageService,
    ChatService,
    UserService,
    EmojiProvider
    
   
  ]
})
export class AppModule {}
