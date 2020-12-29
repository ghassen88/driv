import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KitContainerComponent } from './kit/kit-container/kit-container.component';
import { PageNotFoundComponent } from '../core/containers/page-not-found/page-not-found.component';
import { ManagerInterfaceComponent } from './manager-interface/manager-interface.component';


const routes: Routes = [

  {
    path: '',
    component: ManagerInterfaceComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        // data:{
        //   shouldReuse: false
        //  }
      },
      {
        path: 'trips',
        loadChildren: './trips/trips.module#TripsModule'
      },
      {
        path: 'groups',
        loadChildren: './group/group.module#GroupModule',

      },
      {
        path: 'driver',
        loadChildren: './drivers/drivers.module#DriversModule',
      },
      {
        path: 'kit',
        component: KitContainerComponent,
      },
      {
        path: 'challenges',

        loadChildren: './challenge/challenge.module#ChallengeModule',
        // data:{
        //   shouldReuse: false
        //  }
      },
      // {
      //   path:'',
      //   loadChildren: './dashboard/dashboard.module#DashboardModule',
      // }
    ],



  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
