import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MarketComponent } from './market-list/market.component';
import { MarketRoutingModule} from './market-routing.module';
import { GlobalModule } from '../shared/global.module'

@NgModule({
    imports:[
        BrowserModule,
        CommonModule,
        FormsModule,
        MarketRoutingModule,
        GlobalModule
    ],
    declarations:[
        MarketComponent
    ]

})
export class MarketModule {}