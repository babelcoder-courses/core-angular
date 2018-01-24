import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Article } from './article';
import { ArticlesResponse } from './articles.response';
import { ArticleResponse } from './article.response';

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticles(page = 1): Observable<ArticlesResponse> {
    return this.http.get<ArticlesResponse>(`/api/articles?page=${page}`);
  }

  getArticle(id: string): Observable<Article> {
    return this.http
      .get<ArticleResponse>(`/api/articles/${id}`)
      .map(res => res.article);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http
      .post<ArticleResponse>(
        '/api/articles',
        { article },
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .map(res => res.article);
  }

  editArticle(id: string, article: Article): Observable<Article> {
    return this.http
      .patch<ArticleResponse>(
        `/api/articles/${id}`,
        { article },
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .map(res => res.article);
  }

  private handleUnautorizedArticle() {}
}
