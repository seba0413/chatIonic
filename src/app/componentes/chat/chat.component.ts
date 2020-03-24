import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from "@ionic/angular";
import { Message } from "../../models/message";
import { ChatsService } from "../../servicios/chats.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public chat: any; 
  public mensajes: any[] = [];
  public msg: string; 
  public room: any; 

  constructor(  private navParams: NavParams,
                private modal: ModalController,
                private chatService: ChatsService ) { }

  ngOnInit() {
    this.chatService.getChatRoom( this.chat.id ).subscribe( room => {
      this.room = room; 
      console.log('room', room);
    });
    this.chat = this.navParams.get('chat');
  }

  closeModal() {
    this.modal.dismiss();
  }

  sendMessage() {

    const mensaje: Message ={
      content: this.msg,
      type: 'text',
      date: new Date()
    }

    this.chatService.sendMsgToFirebase( mensaje, this.chat.id );
    this.msg = '';
  }

}
