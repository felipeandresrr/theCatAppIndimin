import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../../providers/http/http';

/**
 * Generated class for the DetailsCatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-cat',
  templateUrl: 'details-cat.html',
  providers:[HttpProvider]
})
export class DetailsCatPage {
  title: string = '';
  breed: any;
  imagesBreed: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsCatPage');
    this.breed = this.navParams.get('breed');
    this.title = this.breed.name;
    this.loadImages(this.breed);
  }

  loadImages(breed) {
    this.http.getBreedImage(breed.id, 8).then(data => {
      this.imagesBreed = data;
   }, error =>{
     console.log('error', error);
   });
  }

}
