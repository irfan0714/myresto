import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderPage } from './order';
import { IonicSelectableModule } from 'ionic-selectable';
@NgModule({
  declarations: [
    OrderPage,
  ],
  imports: [
  IonicSelectableModule,
    IonicPageModule.forChild(OrderPage),
  ],
})
export class OrderPageModule {}
