import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
  providers: [HttpProvider]
})
export class GamePage {
  breeds: any = [];
  breedsRandom: any = [];
  breedCorrect: any = [];
  breedEligible: any;
  loading: any;
  vecesJugado: number = 0;
  porcentajeExito: number = 0;
  loaded: boolean = false;
  itemSelected: boolean = false;
  playAgain: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: HttpProvider, private storage: Storage, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.loadBreed();
    this.loadDataUser();
  }

  loadBreed() {
    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `
        <div class="custom-spinner-container" style="background:transparent;">
          <div class="custom-spinner-box">
             <img src="https://loading.io/spinners/cutiefox/lg.cutie-fox-spinner.gif" />
          </div>
        </div>`,
    });
    this.loading.present();
    this.http.getBreeds().subscribe(data => {
      this.breeds = JSON.parse(data['_body']);
      this.getRandom();
    }, error => {
      console.log('error', error);
    });
  }

  loadDataUser(){
    this.storage.get('dataUser').then((val) => {
      if(val != null) {
        if(val.vecesJugado){
          this.vecesJugado = val.vecesJugado;
        } 
        if(val.porcentajeExito){
          this.porcentajeExito = val.porcentajeExito;
        } 
      }      
    });
  }

  async getRandom() {
    for(let i = 0; i < 3; i++){
      let rd = Math.floor(Math.random() * this.breeds.length);
      this.breeds[rd].image = await this.getBreedImage(this.breeds[rd].id);
      this.breeds[rd].selected = i;
      this.breedsRandom.push(this.breeds[rd]);
    }
    this.getCorrectBreed();
  }

  getCorrectBreed(){
    let random = Math.floor(Math.random() * this.breedsRandom.length);
    this.breedCorrect.push(this.breedsRandom[random]);
    this.loading.dismiss();
    this.loaded = true;
  }

  chooseItem(item,i){
    this.breedEligible = item;
    this.itemSelected = i;
  }

  validateItem(){
    if(this.breedEligible.name === this.breedCorrect[0].name){
      this.porcentajeExito = (this.porcentajeExito+1) > 100 ? 100 : this.porcentajeExito+1;
      alert('CORRECT :)');
    }else{
      this.porcentajeExito = (this.porcentajeExito-1) < 0 ? 0 : this.porcentajeExito-1;
      alert('INCORRECT :(');
    }
    this.vecesJugado++;
    let dataUser = {
      vecesJugado: this.vecesJugado,
      porcentajeExito: this.porcentajeExito
    };
    this.storage.set('dataUser', dataUser);
    this.playAgain = true;
  }

  async getBreedImage(breed) {
    return await this.http.getBreedImage(breed, 1).then(data => {
      return data[0].url;
    }, error => {
      console.log('error', error);
    });
  }

  playGameAgain(){
    this.breeds = [];
    this.breedsRandom = [];
    this.breedCorrect = [];
    this.breedEligible = {};
    this.itemSelected = null;
    this.playAgain = false;
    this.loaded = false;
    this.loadBreed();
    this.loadDataUser();
  }

}
