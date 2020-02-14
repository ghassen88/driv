import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculesComponent } from './conteneurs/vehicules/vehicules.component';
import { VehiculesRoutingModule } from './vehicules-routing.module';



@NgModule({
  declarations: [VehiculesComponent],
  imports: [
    CommonModule,
    VehiculesRoutingModule
  ]
})
export class VehiculesModule { }
