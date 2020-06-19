import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TakingorderPage } from './takingorder';

@NgModule({
  declarations: [
    TakingorderPage,
  ],
  imports: [
    IonicPageModule.forChild(TakingorderPage),
  ],
})
export class TakingorderPageModule {}
