import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatsPage } from './cats';

@NgModule({
  declarations: [
    CatsPage,
  ],
  imports: [
    IonicPageModule.forChild(CatsPage),
  ],
})
export class CatsPageModule {}
