import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { PersonalComponent } from './personal.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { MyStoreComponent } from './my-store/my-store.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { AuthGuard } from '../auth-guard.service';

const personalRoutes: Routes = [
    {
      path: 'personal',
      component: PersonalComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          children: [
            { path: 'my-store', component: MyStoreComponent, data: { title: 'My Store' } },
            { path: 'item-create', component: ItemCreateComponent, data: { title: 'Add New Item' } },
            { path: 'item-edit/:id', component: ItemEditComponent, data: { title: 'Edit Item' } },
            { path: '', redirectTo: '../my-store', pathMatch: 'full' }
          ]
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(personalRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class PersonalRoutingModule {}