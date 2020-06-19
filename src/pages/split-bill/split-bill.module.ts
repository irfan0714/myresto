import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplitBillPage } from './split-bill';

@NgModule({
  declarations: [
    SplitBillPage,
  ],
  imports: [
    IonicPageModule.forChild(SplitBillPage),
  ],
})
export class SplitBillPageModule {}
