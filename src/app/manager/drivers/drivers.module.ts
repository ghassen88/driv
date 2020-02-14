import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversProfileList } from './containers/drivers/drivers-profile-list.component';
import { DriversRoutingModule } from './drivers-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/drivers-reducer';
import { EffectsModule } from '@ngrx/effects';
import { DriversEffect } from './effects/drivers.effect';
import { SharedModule } from '../../shared/shared.module';
import { AngularResizedEventModule } from 'angular-resize-event';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriverStatComponent } from './containers/driver-stat/driver-stat.component';
import { DriverResultsComponent } from './components/driver-results/driver-results.component';
import { CoreModule } from 'src/app/core/core.module';
import { DriverScoresComponent } from './components/driver-scores/driver-scores.component';
import { DriverSummaryComponent } from './components/driver-summary/driver-summary.component';
import { DriverTripsComponent } from './components/driver-trips/driver-trips.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';





@NgModule({
  declarations: [
    DriversProfileList,
    DriverStatComponent,
    DriverResultsComponent,
    DriverScoresComponent,
    DriverSummaryComponent,
    DriverTripsComponent,
    TripDetailComponent
    ],
  imports: [
    CommonModule,
    DriversRoutingModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    StoreModule.forFeature('drivers', { reducer }),
    EffectsModule.forFeature([DriversEffect]),
    SharedModule,
    AngularResizedEventModule,
    NgbDropdownModule,
    NgSelectModule,
    FormsModule,
    CoreModule,
    LeafletModule  

  ],
  exports: [
    //InviteDriverComponent
  ],
  entryComponents: []
 
})
export class DriversModule { }
