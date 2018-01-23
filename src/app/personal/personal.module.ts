import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonalRoutingModule } from './personal-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { PersonalComponent } from './personal.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { MyStoreComponent } from './my-store/my-store.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { GlobalModule } from '../shared/global.module'
 
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    PersonalRoutingModule,
    GlobalModule
  ],
  declarations: [
    PersonalComponent,
    ItemCreateComponent,
    MyStoreComponent,
    ItemEditComponent
  ]
})
export class PersonalModule {}