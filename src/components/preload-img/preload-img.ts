import { Component,Input, OnInit, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'preload-img',
  templateUrl: 'preload-img.html',
  inputs:['src']
})
export class PreloadImgComponent implements OnInit {
  @Input() src : string;
  public loaded : boolean;

  constructor(public navCtrl: NavController, public http: HttpProvider) {
    this.loaded = false;
    
  }
  /**
   *  Carga Lenta de Imagen por temas de performance
   */
  async ngOnInit() {
    var img = new Image();  
    var event:EventEmitter<boolean>;
    event = new EventEmitter();
    img.onload = function(){
       event.emit(true);
    }
    event.subscribe(item=>this.ngOnLoad())
    img.src = this.src;
  }
  ngOnLoad(){
    this.loaded = true;
  }
  
}