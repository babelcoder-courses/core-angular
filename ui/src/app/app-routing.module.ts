import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/articles',
    pathMatch: 'full'
  },
  {
    path: 'articles',
    loadChildren: 'app/articles/articles.module#ArticlesModule'
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
