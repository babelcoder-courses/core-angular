import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../shared/auth.guard';
import { UnsavedChangesGuard } from '../shared/unsaved-changes.guard';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleListComponent,
  }, {
    path: 'new',
    component: CreateArticleComponent,
    canActivate: [AuthGuard],
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: ':id/edit',
    component: EditArticleComponent,
    canActivate: [AuthGuard],
    canDeactivate: [UnsavedChangesGuard]
  },
  { path: ':id', component: ArticleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ArticlesRoutingModule { }
