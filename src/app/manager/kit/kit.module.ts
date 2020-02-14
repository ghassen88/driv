import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitContainerComponent } from './kit-container/kit-container.component';
import { SharedModule } from '../../shared/shared.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserModule } from '@angular/platform-browser';


import { NgScrollbarModule } from 'ngx-scrollbar';


@NgModule({
  declarations: [KitContainerComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgScrollbarModule,
    LeafletModule,
    NgxDatatableModule

  ],
  exports: [KitContainerComponent]
})
export class KitModule { }
