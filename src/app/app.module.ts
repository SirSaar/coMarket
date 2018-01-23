import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemService } from './item.service';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MarketModule } from './market/market.module';  //public market feature
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { PersonalModule } from './personal/personal.module';  //private authorized feature-my store,my profile

import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
 
@NgModule({
  declarations: [  //cascades only to current module
    AppComponent,
    PageNotFoundComponentComponent
  ],
  imports: [  //cascades only to current module
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MarketModule,
    PersonalModule,
    AppRoutingModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/'}, ItemService, AuthGuard, AuthService ],  //cascade to the child modules
  bootstrap: [AppComponent]
})
export class AppModule { 
    // Diagnostic only: inspect router configuration
    constructor(router: Router) {
      console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}
