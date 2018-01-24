import { Article } from './article';

export interface ArticlesResponse {
  articles: Article[];
  count: number;
}
