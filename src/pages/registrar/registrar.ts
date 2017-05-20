import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the RegistrarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
	
	private registro;

  constructor(public navCtrl: NavController, public navParams: NavParams,
            private http: Http, public loadingCtrl: LoadingController, 
            private camera: Camera) {
  	this.registro = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  isValid(){
    let nome     = this.registro.nome;
    let telefone = this.registro.telefone;
    let tipo     = this.registro.tipo;
    let caract   = this.registro.crt;
    return !(nome && telefone && tipo && caract);
  }

  registrar(){
    let url = 'https://curso-mobile.herokuapp.com/registers';

    let objetoEnvio = {
      register: {
        nome: this.registro.nome,
        telefone: this.registro.telefone,
        tipo: this.registro.tipo,
        foto:this.registro.foto,
        caracteristicas: this.registro.crt
      }
    };

    let loader = this.loadingCtrl.create({
      content: 'Aguarde...',
    });
    loader.present(); // Exibe Loader

    if(this.isValid()){
      alert('Preencha os campos');
    } else {
      this.http.post(url, objetoEnvio).toPromise().then((result) => {
        loader.dismiss();    
        console.log(result);
      }).catch((error) => {
        loader.dismiss();
        console.error('Falha ao gravar registro', error);
      });
    }


  	//console.log(this.registro);
  	//alert('Clicou em Registar');
  	//console.log('Clicou em Registar');
  
  }

  foto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.registro.foto = base64Image;
    }, (err) => {
      alert('Falha ao obter foto.');
    });
  }

}
