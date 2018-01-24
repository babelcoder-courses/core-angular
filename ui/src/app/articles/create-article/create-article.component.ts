import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Article } from '../shared/article';
import { ArticleService } from '../shared/article.service';
import { ArticleFormComponent } from '../shared/article-form/article-form.component';
import { CanComponentDeactivate } from '../../shared/can-component-deactivate';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements CanComponentDeactivate {

  submitted = false;

  @ViewChild(ArticleFormComponent) form: ArticleFormComponent;

  constructor(
    private router: Router,
    private articleService: ArticleService
  ) { }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.form.articleForm.pristine || this.submitted;
  }

  onSubmit(article: Article) {
    this.submitted = true;
    this.articleService
    .createArticle(article)
    .subscribe(_ => this.router.navigateByUrl(`/articles`));
  }

}
