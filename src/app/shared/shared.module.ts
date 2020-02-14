import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from './components/drivata-charts';
import { RatingCircleComponent } from './components/rating-circle/rating-circle.component';
import { TrajectoryMapComponent } from './components/trajectory-map/trajectory-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { VerticalBarChartComponent } from './components/vertical-bar-chart/vertical-bar-chart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StackedBarChartComponent } from './components/stacked-bar-chart/stacked-bar-chart.component';
import { KeysPipe, KeyPipe } from './pipes/keys.pipe';
import { ActifPipe, DisablePipe } from './pipes/status.pipe';
import { TimePipe, IsDayPipe } from './pipes/time.pipe';
import { DistancePipe } from './pipes/distance.pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InviteDriverComponent } from './components/invite-driver/invite-driver.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerformanceSummaryComponent } from './components/performance-summary/performance-summary.component';
import { SavingsSummaryComponent } from './components/savings-summary/savings-summary.component';
import { StatisticsSummaryComponent } from './components/statistics-summary/statistics-summary.component';
import { AngularResizedEventModule } from 'angular-resize-event';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    RatingCircleComponent,
    TrajectoryMapComponent,
    VerticalBarChartComponent,
    DonutChartComponent,
    LineChartComponent,
    PieChartComponent,
    StackedBarChartComponent,
    KeysPipe,
    KeyPipe,
    DisablePipe,
    ActifPipe,
    IsDayPipe,
    TimePipe,
    DistancePipe,
    InviteDriverComponent,
    PerformanceSummaryComponent,
    SavingsSummaryComponent,
    StatisticsSummaryComponent

  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    LeafletModule,
    HttpClientModule,
    NgxDatatableModule,
    FormsModule,
    NgbModalModule,
    NgbDropdownModule,
    NgSelectModule,
    AngularResizedEventModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      isolate: false
    })
  ],
  exports: [
    NgxChartsModule,
    RatingCircleComponent,
    TrajectoryMapComponent,
    DonutChartComponent,
    LineChartComponent,
    VerticalBarChartComponent,
    PieChartComponent,
    StackedBarChartComponent,
    KeysPipe,
    KeyPipe,
    ActifPipe,
    DisablePipe,
    TimePipe,
    IsDayPipe,
    DistancePipe,
    TranslateModule,
    VerticalBarChartComponent,
    PerformanceSummaryComponent,
    SavingsSummaryComponent,
    StatisticsSummaryComponent
    ],
    entryComponents: [InviteDriverComponent]

})
export class SharedModule { }
