import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsCatPage } from './details-cat';

@NgModule({
  declarations: [
    DetailsCatPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsCatPage),
  ],
})
export class DetailsCatPageModule {}
