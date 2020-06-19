import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplitBillDetailPage } from './split-bill-detail';
import { AccordionComponent } from "../../components/accordion/accordion";

@NgModule({
  declarations: [
    SplitBillDetailPage,
    AccordionComponent
  ],
  imports: [
    IonicPageModule.forChild(SplitBillDetailPage),
  ],
})
export class SplitBillDetailPageModule { }
