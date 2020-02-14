import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ManagerSideNavComponent } from './components/manager-side-nav/manager-side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';
import { AppComponent } from './containers/app/app.component';
import { RouterModule } from '@angular/router';
import { ClickOutsideModule } from 'ng-click-outside';
import { StoreModule } from '@ngrx/store';
import * as fromCore from './store/reducers/core.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CoreEffects } from './store/effects/core.effects';
import { Stat1PlaceHolderComponent } from './components/placeholders/stat1-place-holder/stat1-place-holder.component';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { Stat2PlaceHolderComponent } from './components/placeholders/stat2-place-holder/stat2-place-holder.component';
import { AngularResizedEventModule } from 'angular-resize-event';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { SharedModule } from '../shared/shared.module';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { NgbDatepickerModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { PeriodPickerComponent } from './components/period-picker/period-picker.component';
import { RangePickerComponent } from './components/range-picker/range-picker.component'
import { Ng5SliderModule } from 'ng5-slider';
import { ScoreRangePickerComponent } from './components/score-range-picker/score-range-picker.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ManagerSideNavComponent,
    FooterComponent,
    UserNavComponent,
    PageNotFoundComponent,
    Stat1PlaceHolderComponent,
    Stat2PlaceHolderComponent,
    ConfirmComponent,
    DateRangePickerComponent,
    PeriodPickerComponent,
    RangePickerComponent,
    ScoreRangePickerComponent,
    
  ],
  imports: [
    CommonModule,
    ContentLoaderModule,
    RouterModule,
    ClickOutsideModule,
    StoreModule.forFeature(fromCore.coreFeatureKey, fromCore.reducer),
    EffectsModule.forFeature([CoreEffects]),
    AngularResizedEventModule,
    SharedModule,
    NgbDatepickerModule,
    Ng5SliderModule,
    NgbDropdownModule,
    FormsModule

  ],
  exports: [
    HeaderComponent,
    ManagerSideNavComponent,
    FooterComponent,
    UserNavComponent,
    PageNotFoundComponent,
    Stat1PlaceHolderComponent,
    Stat2PlaceHolderComponent,
    PeriodPickerComponent,
    RangePickerComponent,
    ScoreRangePickerComponent
    ]
})
export class CoreModule { }
