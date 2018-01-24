import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Article } from '../shared/article';
import { ArticleService } from '../shared/article.service';
import { CanComponentDeactivate } from '../../shared/can-component-deactivate';
import { ArticleFormComponent } from '../shared/article-form/article-form.component';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit, CanComponentDeactivate {

  @ViewChild(ArticleFormComponent) form: ArticleFormComponent;

  article: Article;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this
      .route
      .paramMap
      .switchMap((params: ParamMap) =>
        this.articleService.getArticle(params.get('id')))
      .subscribe(article => this.article = article);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.form.articleForm.pristine || this.submitted;
  }

  onSubmit(article: Article) {
    this.submitted = true;
    this
      .articleService
      .editArticle(this.article.id, article)
      .subscribe(
        updatedArticle =>
          this.router.navigateByUrl(`/articles/${updatedArticle.id}`)
      );
  }

}
