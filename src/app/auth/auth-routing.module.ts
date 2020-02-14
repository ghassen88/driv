import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './conteneurs/login/login.component';
import { InscriptionComponent } from './conteneurs/inscription/inscription.component';
import { ExpiredComponent } from './components/expired/expired.component';


const routes: Routes = [
  
    
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'inscription/:token',
        component: InscriptionComponent
      },
      {
        path: 'inscription',
        component: InscriptionComponent
      },
      {
        path: 'expired',
        component: ExpiredComponent
      },
      {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path:'**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    
  ,
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
