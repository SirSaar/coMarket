import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import { MyStoreComponent } from './my-store/my-store.component';

//saar
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SplitPipe } from './split.pipe';
import { ItemCreateComponent } from './item-create/item-create.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemService } from './item.service';
import { MarketComponent } from './market/market.component';

const appRoutes: Routes = [
  {
    path: 'market',
    component: MarketComponent,
    data: { title: 'coMarket' }
  },
  {
    path: 'my-store',
    component: MyStoreComponent,
    data: { title: 'My Store' }
  },
  {
    path: 'item-create',
    component: ItemCreateComponent,
    data: { title: 'Add New Item' }
  },
  {
    path: 'item-edit/:id',
    component: ItemEditComponent,
    data: { title: 'Edit Item' }
  },
  { path: '',
    redirectTo: '/my-store',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponentComponent }
];

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
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/'}, ItemService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
