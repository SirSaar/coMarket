import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { SplitPipe } from './split.pipe';
import { ItemService } from './item.service';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MarketComponent } from './market/market.component';
import { MyStoreComponent } from './my-store/my-store.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemCreateComponent } from './item-create/item-create.component';

@NgModule({
  declarations: [
    AppComponent,
    MyStoreComponent,
    SplitPipe,
    ItemCreateComponent,
    PageNotFoundComponentComponent,
    ItemEditComponent,
    MarketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/'}, ItemService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
