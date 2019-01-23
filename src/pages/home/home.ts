import { ImageProvider } from './../../providers/image/image';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailProvider } from '../../providers/email/email';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public form: FormGroup;
  private _attachment: any;
  constructor(public navCtrl: NavController,
    private _ALERT: AlertController,
    private _FORM: FormBuilder,
    private _IMAGE: ImageProvider,
    private _EMAIL: EmailProvider) {
    this.form = this._FORM.group({
      "to": ["", Validators.required],
      "cc": ["", Validators.required],
      "bcc": ["", Validators.required],
      "subject": ["", Validators.required],
      "message": ["", Validators.required]
    });
  }
  //recuperar el archivo adjunto
  retrieveAttachment(): void {
    this._IMAGE.selectPhotograph()
      .then((attachment: any) => {
        //asigna la imagen a la propiedad privada, a la cual posteriormente desde el metodo sendmessage 
        this._attachment = attachment;
      });
  }
  //Muestra el mensaje
  displayMessage(title: string, subTitle: string): void {
    let alert: any = this._ALERT.create({
      title: title,
      subTitle: subTitle,
      buttons: ['Got it']
    });
    alert.present();
  }

  sendMessage(): void {
    //para Recupera los camps del formulario
    let to: string = this.form.controls["to"].value,
      cc: string = this.form.controls["cc"].value,
      bcc: string = this.form.controls["bcc"].value,
      subject: string = this.form.controls["subject"].value,
      message: string = this.form.controls["message"].value;

      //controla si se ha seleccionado un archivo adjunto
    if (this._attachment.length > 1) {
      //si se ha seleccionado llama al metodo sendEmail del emailProvider
      this._EMAIL.sendEmail(to, cc, bcc, this._attachment, subject, message);
    }
    else {
      // Informe al usuario de que necesita agregar un archivo adjunto
      this.displayMessage('Error', 'Necesita adjuntar un archivo');
    }
  }
}
