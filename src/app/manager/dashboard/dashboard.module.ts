import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import * as fromAcceuil from './store/reducers/dashboard.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AcceuilEffects } from './store/effects/dashboard.effects';
import { DashboardStatComponent } from './components/dashboard-stat/dashboard-stat.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularResizedEventModule } from 'angular-resize-event';
import { DriversByCategoryComponent } from './components/drivers-by-category/drivers-by-category.component';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DriversListComponent } from './components/drivers-list/drivers-list.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardStatComponent,
    DriversByCategoryComponent,
    DriversListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    NgbDropdownModule,
    FormsModule,
    DashboardRoutingModule,
    ContentLoaderModule,
    StoreModule.forFeature(fromAcceuil.acceuilFeatureKey, fromAcceuil.reducer),
    EffectsModule.forFeature([AcceuilEffects]),
    AngularResizedEventModule,
    NgSelectModule,

  ]
})
export class DashboardModule { }
