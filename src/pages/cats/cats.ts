import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import { DetailsCatPage } from './details-cat/details-cat';
/**
 * Generated class for the CatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cats',
  templateUrl: 'cats.html',
  providers: [HttpProvider]
})
export class CatsPage {
  breeds: any = [];
  breedsFinal: any = [];
  searchBreed: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatsPage');
    this.loadBreed();
  }
  /**
   * Carga de las Razas disponibles
   */
  loadBreed() {
    this.http.getBreeds().subscribe(async data => {
      this.breeds = JSON.parse(data['_body']);
      for (let breed in this.breeds) {
        this.breeds[breed].image = await this.getBreedImage(this.breeds[breed].id);
      }
      this.breedsFinal = this.breeds;
    }, error => {
      console.log('error', error);
    });
  }

  /**
   * Carga asincrona de Imagen por raza
   * @param breed 
   */
  async getBreedImage(breed) {
    return await this.http.getBreedImage(breed, 1).then(data => {
      return data[0].url;
    }, error => {
      console.log('error', error);
    });
  }

  /**
   * Llamada a la página del detalle de la raza seleccionada
   * @param breed
   */
  detailsCat(breed) {
    this.navCtrl.push(DetailsCatPage, { breed: breed });
  }

  /**
   * Filtro de búsqueda para las razas
   * @param e 
   */
  updateSearch(e) {
    if (!this.searchBreed) {
      this.breeds = this.breedsFinal;
    }
    if (e.target.value) {
      this.breeds = this.breeds.filter((item) => {
        return item.name.toLowerCase().indexOf(this.searchBreed.toLowerCase()) > -1;
      });
    }

  }

  /**
   * Cancela el filtro de búqueda
   * @param e 
   */
  onCancel(e) {
    this.breeds = this.breedsFinal;
  }



}
