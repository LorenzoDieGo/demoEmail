import { EmailComposer } from '@ionic-native/email-composer';
import { Injectable } from '@angular/core';

/*
  Generated class for the EmailProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmailProvider {

  constructor(private _EMAIL: EmailComposer) {
  }
  /**
      *
      * @public
      * @method sendMail
      * @param to    			{string}    The primary e-mail address
      * @param cc    			{string}    The carbon copy e-mail address
      * @param bcc   			{string}    The blank carbon copy e-mail address
      * @param attachment     {string}    The attachment to be sent
      * @param subject        {string}    The subject for the e-mail message
      * @param body           {string}    The message content
      *
      */

  sendEmail(to: string,
    cc: string,
    bcc: string,
    attachment: string,
    subject: string,
    body: string): void {
    //Metodo para comprobar si el usuario ha configurado una cuenta de correo electronico
    this._EMAIL.isAvailable().then((avaible: boolean) => {
      //Verifica que se han concedido permisos de acceso a la cuenta  
      this._EMAIL.hasPermission().then((isPermited: boolean) => {
        //define un bjeto que contiene un mapa clave/Valor para rellenar el dispositivo con los camos de correo 
        //predeterminados cuando se crea un nuevo mnsaje
        let email: any = {
          app: 'mailto',
          to: to,
          cc: cc,
          bcc: bcc,
          attachments: [
            attachment
          ],
          subject: subject,
          body: body
        };
        //abre el cliente mail y crea un nuevo mensaje rellenado con con el objeto que contiene nuestro mensaje
        this._EMAIL.open(email);
      })
      .catch((error: any)=>{
        console.log("No tiene permisos de accceso");
        console.dir(error);
      });
    })
    .catch((error: any)=>{
      console.log('El usuario no parece tener cuenta de correo electrónico del dispositivo');
         console.dir(error);
    })
  }

}
