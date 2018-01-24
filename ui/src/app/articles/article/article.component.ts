import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ArticleService } from '../shared/article.service';
import { Article } from '../shared/article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: Article;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.loadArticle();
  }

  private loadArticle() {
    this
      .route
      .paramMap
      .switchMap((params: ParamMap) =>
        this.articleService.getArticle(params.get('id')))
      .subscribe(article => this.article = article);
  }
}
