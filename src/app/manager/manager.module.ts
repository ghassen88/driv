import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { KitModule } from './kit/kit.module';
import { CoreModule } from '../core/core.module';
import { ManagerInterfaceComponent } from './manager-interface/manager-interface.component';
import { SharedModule } from '../shared/shared.module';
import { AngularResizedEventModule } from 'angular-resize-event';
import { ClickOutsideModule } from 'ng-click-outside';


@NgModule({
  declarations: [ManagerInterfaceComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    KitModule,
    CoreModule,
    AngularResizedEventModule,
    ClickOutsideModule

    ],
  providers:[],
 // entryComponents: [InviteDriverComponent]
})
export class ManagerModule { }
