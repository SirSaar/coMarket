import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MyStoreComponent } from './my-store/my-store.component';

//saar
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SplitPipe } from './split.pipe';
import { ItemCreateComponent } from './item-create/item-create.component';

const appRoutes: Routes = [
  {
    path: 'mystore',
    component: MyStoreComponent,
    data: { title: 'My Store' }
  },
  {
    path: 'item-create',
    component: ItemCreateComponent,
    data: { title: 'Add Item' }
  },
  { path: '',
    redirectTo: '/store',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MyStoreComponent,
    SplitPipe,
    ItemCreateComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
