import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';

const appRoutes: Routes = [
    { path: '',
      redirectTo: '/market',
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