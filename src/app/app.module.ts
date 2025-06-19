import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';

import { CoreModule } from "./core/core.module";
import { AccountModule } from "./account";
import { AppRoutingModule } from "./app.routes";
import { StoreModule } from "@ngrx/store";
import { metaReducers, rootReducers } from "./reducers";
import { EffectsModule } from '@ngrx/effects';
import { UserEffects, RouterEffects } from './core/effects';
import { ResponsiveService } from './core/services/responsive-service';
import { LoadingService } from './core/services/loading-service ';
import { LoadingInterceptor } from './interceptors/loading.interceptor ';
import {ProductsModule} from "./products/products.module";


@NgModule({
  providers: [
    ResponsiveService,
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AccountModule,
    ProductsModule,
    AppRoutingModule,
    // StoreModule.forRoot(rootReducers, {
    //   metaReducers,
    //   runtimeChecks: {
    //     // strictStateImmutability and strictActionImmutability are enabled by default
    //     strictStateSerializability: true,
    //     strictActionSerializability: true,
    //     strictActionWithinNgZone: true,
    //     strictActionTypeUniqueness: true,
    //   },
    // }),
    // StoreRouterConnectingModule.forRoot(),
    //
    // StoreDevtoolsModule.instrument({
    //   name: 'Template  App',
    //   // In a production build you would want to disable the Store Devtools
    //   // logOnly: !isDevMode(),
    // }),
    //
    // EffectsModule.forRoot(UserEffects, RouterEffects),
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
