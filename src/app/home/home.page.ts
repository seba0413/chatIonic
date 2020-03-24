import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ChatsService, chat } from '../servicios/chats.service';
import { ModalController, ActionSheetController } from "@ionic/angular";
import { ChatComponent } from '../componentes/chat/chat.component';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  chatRooms: any[] = [];

  constructor(public authService: AuthService,
              private chatsService: ChatsService,
              private modal: ModalController,
              public actionSheetController: ActionSheetController) {}

  openChat( chat ) {
    this.modal.create({
      component: ChatComponent,
      componentProps: {
        chat: chat 
      }
    }).then( (modal) => modal.present())
  }

  onlogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.chatsService.getChatRooms().subscribe( chats => {
     
      this.chatRooms = chats;

    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Desconectarse',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.onlogout();
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


}
