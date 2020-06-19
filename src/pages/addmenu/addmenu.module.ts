import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddmenuPage } from './addmenu';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    AddmenuPage,
  ],
  imports: [
    IonicSelectableModule,
    IonicPageModule.forChild(AddmenuPage),
  ],
})
export class AddmenuPageModule {}
