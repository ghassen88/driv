import { Routes, RouterModule } from "@angular/router";
import { DriversProfileList } from './containers/drivers/drivers-profile-list.component';
import { NgModule } from '@angular/core';
import { DriverStatComponent } from './containers/driver-stat/driver-stat.component';

const routes: Routes = [
    {
        path: '',
        component: DriversProfileList,
    },
    {
        path: ':driverId',
        component: DriverStatComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DriversRoutingModule { }