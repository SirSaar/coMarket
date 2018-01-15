import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { MarketComponent } from './market/market.component';
import { MyStoreComponent } from './my-store/my-store.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemCreateComponent } from './item-create/item-create.component';

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
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}