import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailListOrderPage } from './detail-list-order';

@NgModule({
  declarations: [
    DetailListOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailListOrderPage),
  ],
})
export class DetailListOrderPageModule {}
