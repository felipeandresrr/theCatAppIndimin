import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Http, Headers } from '@angular/http';
import * as Constants from '../../constans/constans-api';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {
  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');
  }

  getHeaders() {
    return new Headers({ 'x-api-key': Constants.API_KEY });
  }

  getCats() {
    let options = new RequestOptions({ headers: this.getHeaders() });
    return this.http.get(Constants.URL_GET_CATS, options);
  }

  getBreeds() {
    let query_params = {
      // limit: 10
    }
    let options = new RequestOptions({ headers: this.getHeaders(), params: query_params });
    return this.http.get(Constants.URL_GET_BREEDS, options);
  }

  getBreedImage(breed: string, limit: number) {
    let query_params = {
      breed_ids: breed,
      limit: limit
    }
    let options = new RequestOptions({ headers: this.getHeaders(), params: query_params });
    return new Promise(resolve => {
      return this.http.get(Constants.URL_GET_BREEDS_IMAGES, options)
        .subscribe((data: any) => {
          let url = JSON.parse(data['_body']);
          return resolve(url);
        }, error => {
          return resolve(error);
        });
    });
  }
}
