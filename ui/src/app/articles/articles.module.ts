import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticlesComponent } from './articles.component';
import { ArticleService } from './shared/article.service';
import { ArticleComponent } from './article/article.component';
import { ArticleFormComponent } from './shared/article-form/article-form.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { CreateArticleComponent } from './create-article/create-article.component';

@NgModule({
  imports: [
    SharedModule,
    ArticlesRoutingModule
  ],
  declarations: [
    ArticleListComponent,
    ArticlesComponent,
    ArticleComponent,
    ArticleFormComponent,
    EditArticleComponent,
    CreateArticleComponent
  ],
  providers: [
    ArticleService
  ]
})
export class ArticlesModule { }
