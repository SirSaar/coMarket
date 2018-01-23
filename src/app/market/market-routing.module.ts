import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketComponent } from './market-list/market.component';

const marketRoutes: Routes = [
    { path: 'market', component: MarketComponent, data: { title: 'coMarket' } }
];

@NgModule({
    imports: [
        RouterModule.forChild(marketRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MarketRoutingModule { }