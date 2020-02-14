import { Routes, RouterModule } from "@angular/router";
import { VehiculesComponent } from './conteneurs/vehicules/vehicules.component';
import { NgModule } from '@angular/core';

const routes:Routes = [
    {
        path:'',
        component: VehiculesComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehiculesRoutingModule {}