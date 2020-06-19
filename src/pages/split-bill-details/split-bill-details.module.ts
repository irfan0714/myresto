import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplitBillDetailsPage } from './split-bill-details';

@NgModule({
  declarations: [
    SplitBillDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SplitBillDetailsPage),
  ],
})
export class SplitBillDetailsPageModule {}
