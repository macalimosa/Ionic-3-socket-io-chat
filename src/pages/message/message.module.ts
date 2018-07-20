import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';
import { RelativeTimePipe } from '../../pipes/relative-time/relative-time';


@NgModule({
  declarations: [
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
    RelativeTimePipe
  ],
})
export class MessagePageModule {}
