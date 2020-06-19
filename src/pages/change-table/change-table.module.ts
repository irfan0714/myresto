import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeTablePage } from './change-table';

@NgModule({
  declarations: [
    ChangeTablePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeTablePage),
  ],
})
export class ChangeTablePageModule {}
