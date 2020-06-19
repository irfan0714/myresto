import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DuplicateMenuPage } from './duplicate-menu';

@NgModule({
  declarations: [
    DuplicateMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(DuplicateMenuPage),
  ],
})
export class DuplicateMenuPageModule {}
