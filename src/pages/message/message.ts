import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform } from 'ionic-angular';
import { MessageService } from '../../services/message.service';
import { ChatService } from '../../services/chat.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Storage } from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
  providers: [FileTransfer, FileTransferObject, File]
})
export class MessagePage implements OnInit {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;
  user: any;
  messages: any;
  me: any;
  chat_message: any;
  editorMsg = '';
  showEmojiPicker = false;
  access_token: string;
  storageDirectory: string = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public messageService: MessageService,
    public chatService: ChatService,
    public userService: UserService,
    public storage: Storage,
    private transfer: FileTransfer,
    private file: File,
    private platform: Platform) {
    this.platform.ready().then(() => {
      

      if (this.platform.is('ios')) {
        console.log('ios');
        this.storageDirectory = this.file.dataDirectory;
      }
      else if (this.platform.is('android')) {
        console.log('android');
        this.storageDirectory = this.file.dataDirectory;
      }
      else {
        console.log('platform none');
        return false;
      }
      if (!this.platform.is('cordova')) {
        return false;
      }
    });
    this.chatService.getMessages().subscribe((data) => {
      console.log('new message', data);
      this.scrollToBottom();
      this.messages.push(data);
    });

    this.chatService.getMessageNotification().subscribe((data) => {
      console.log('notification', data);
    });


  }

  ngOnInit() {

    this.user = this.navParams.data;
    console.log('me', this.userService.getUser());
    this.me = this.userService.getUser().user;
    this.storage.get('token').then((token) => {
      this.access_token = token;
      this.messageService.getMessageByUser(this.user).subscribe((response) => {

        this.messages = response.data.messages.data;
        let data = { client: this.me.id, conversation: response.data.conversation.id };
        this.chatService.startConversation(data);
        console.log('messages', this.messages);
      });
    });



  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }

  onSendMessage() {
    if (!this.showEmojiPicker) {
      this.focus();
    }
    let message = {
      text: this.chat_message,
      user: { name: this.user.name },
      created_at: new Date(),
      message_ref: Date().toString(),
      is_send: false,
      user_id: this.me.id
    }
    this.messages.push(message);
    this.scrollToBottom();
    this.chat_message = '';

    this.messageService.sendMessage(this.user.id, message).subscribe((response) => {
      console.log('response', response);
      if (response.data) {
        let index = this.getMessageByRef(response.data.message_ref);
        this.messages[index] = response.data;
      }
    })
  }

  onFocus() {
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.focus();
    } else {
      this.setTextareaScroll();
    }
    this.content.resize();
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  private setTextareaScroll() {
    const textarea = this.messageInput.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

  private focus() {
    if (this.messageInput && this.messageInput.nativeElement) {
      this.messageInput.nativeElement.focus();
    }
  }
  getMsgIndexById(id: string) {
    return this.messages.findIndex(e => e.messageId === id)
  }

  getMessageByRef(ref: string) {
    return this.messages.findIndex(e => e.message_ref === ref);
  }

  download(fileurl, filename) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = fileurl + '&access_token=' + this.access_token;
    console.log('url', url);
    console.log('storageDirectory',this.storageDirectory);
    console.log('this.file.dataDirectory',this.file.dataDirectory);
    fileTransfer.download(url, this.storageDirectory + 'test.docx').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      console.log('error', error);
    });
  }

}
