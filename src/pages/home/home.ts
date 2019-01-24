import { EmailComposer } from '@ionic-native/email-composer';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   asunto='';
   cuerpo='';
   para='';
  constructor(public navCtrl: NavController, public emailComposer: EmailComposer) {

}
send(){
  let email={
    to: this.para,
    cc:[],
    bcc: [],
    subject: this.asunto,
    body: this.cuerpo,
    isHtml: false,
    app: "Gmail"
  }
  this.emailComposer.open(email);
}
}