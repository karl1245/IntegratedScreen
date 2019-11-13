import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {Article} from './article';
import {NewsSource} from './news-source';
import {BehaviorSubject, Subject} from 'rxjs';
import {StorageService} from '../storage.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Uses NewsSource API
 * https://newsapi.org/
 */
export class NewsService {
  private _APIKey: string = "";

  newsSubject = new Subject<Article[]>();
  errorSubject = new BehaviorSubject<string>(null);

  selectedSources: NewsSource[] = [];

  constructor (private http: HttpClient, private storageService: StorageService) {
    this.APIKey = this.storageService.getNewsAPIKey();
    this.selectedSources = this.storageService.getNews();
  }

  get APIKey(): string {
    return this._APIKey;
  }

  set APIKey(value: string) {
    this._APIKey = value;
    this.storageService.saveNewsAPIKey(value);
  }


  /**
   * Returns a list of all the available news sources.
   */
  getNewsSources() {
    const params = new HttpParams().set("apiKey", this.APIKey);
    return this.http.get<{status: string, sources: NewsSource[]}>(
      "https://newsapi.org/v2/sources",
      {
        params: params
      }).pipe(take(1));
  }


  /**
   * Gets all the news articles with the given sources
   * @param sources - array of news site id's
   */
  getNewsBySources(sources: NewsSource[]) {
    this.selectedSources = sources;

    let concatSources = "";
    for (const source of sources) {
      concatSources += source.id + ",";
    }
    concatSources = concatSources.substring(0, concatSources.length - 1);

    let params = new HttpParams().set("apiKey", this.APIKey);
    params = params.set("sources", concatSources);

    this.http.get<{status: string, totalResults: number, articles: Article[]}>(
      "https://newsapi.org/v2/top-headlines",
      {
        params: params
      }
    ).pipe(
      take(1)
    ).subscribe(response => {
      this.errorSubject.next(null);
      this.newsSubject.next(response.articles);
    }, error => {
      this.errorSubject.next(error.error.message);
    });
    this.storageService.saveNews(this.selectedSources);
  }

  /**
   * Runs getNewsBySources with selectedSources if there are any.
   */
  getNews() {
    if (this.selectedSources.length > 0) {
      this.getNewsBySources(this.selectedSources);
    }
  }
}
