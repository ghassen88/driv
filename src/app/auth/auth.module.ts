import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { InscriptionComponent } from './conteneurs/inscription/inscription.component';
import { LoginComponent } from './conteneurs/login/login.component';
import { ExpiredComponent } from './components/expired/expired.component';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';


@NgModule({
  declarations: [InscriptionComponent, LoginComponent, ExpiredComponent, InscriptionFormComponent, LoginFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ]
})
export class AuthModule { }
