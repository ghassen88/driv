import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './core/containers/app/app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { KitModule } from './manager/kit/kit.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppEffects } from './store/effects/app.effects';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpTokenInterceptor } from './core/services/token.Interceptor';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LOCALE_ID } from '@angular/core';

import { ToastrModule } from 'ngx-toastr';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [],
  imports: [
    
    BrowserModule,
    LeafletModule.forRoot(),
    AppRoutingModule,
    AngularFontAwesomeModule,
    KitModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects, AppEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
    }),
    StoreModule.forRoot(reducers, {
      metaReducers, 
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      //logOnly: environment.production, // Restrict extension to log-only mode
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      isolate:false
  })
  ],
  exports: [CoreModule,SharedModule,AuthModule],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS,useClass:HttpTokenInterceptor,multi:true }
 

],
  bootstrap: [AppComponent]
})
export class AppModule { }
