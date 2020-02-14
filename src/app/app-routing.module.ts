import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';
import { LoginComponent } from './auth/conteneurs/login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'manager',
    loadChildren: './manager/manager.module#ManagerModule',
    data: {
      role: ['PremiumManager']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    data: {
      role: ['Admin']
    },
    canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   redirectTo: 'auth',
  //   pathMatch:'full'
  // },
  // {
  //   path: '**',
  //   redirectTo: 'auth',
  //   pathMatch: 'full'
  // }
  {
    path:'kit',
    component: LoginComponent
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
