import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ArticleService } from '../shared/article.service';
import { Article } from '../shared/article';
import { ArticlesResponse } from '../shared/articles.response';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Article[];
  page = 1;
  count = 5;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit() {
    this.loadArticles();
  }

  onPageChange(page: number) {
    this.router.navigate(['/articles'], { queryParams: { page } });
  }

  private loadArticles(page = 1) {
    this.route.queryParamMap
      .switchMap((paramMap: ParamMap) =>
        this.articleService.getArticles(+paramMap.get('page') || 1)
      )
      .subscribe(({ articles, count }: ArticlesResponse) => {
        this.articles = articles;
        this.count = count;
      });
  }
}
