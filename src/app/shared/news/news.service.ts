import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {Article} from './article';
import {NewsSource} from './news-source';
import {BehaviorSubject, Subject, Subscription, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Uses NewsSource API
 * https://newsapi.org/
 */
export class NewsService {
  private _APIKey: string = "";

  newsSubject = new BehaviorSubject<Article[]>([]);
  updateTimer: Subscription;

  errorSubject = new Subject<string>();

  // TODO: take them from storage
  selectedSources: NewsSource[] = [];

  constructor (private http: HttpClient) {
    if (this.selectedSources.length > 0) {
      this.getNewsBySources(this.selectedSources);
    }
  }

  get APIKey(): string {
    return this._APIKey;
  }

  set APIKey(value: string) {
    this._APIKey = value;
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

  convertSourceToId (sources: NewsSource[]) {
    let sourcesString: string[] = [];
    for (const source of sources) {
      sourcesString.push(source.id);
    }
    return sourcesString;
  };


  /**
   * Gets all the news articles with the given sources
   * @param sources - array of news site id's
   * @param keyword - keyword that needs to be in the news, optional argument - currently disabled
   */
  getNewsBySources(sources: NewsSource[], keyword?: string) {
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
      this.newsSubject.next(response.articles);
    }, error1 => {
      this.errorSubject.next(error1);
      console.log(error1);
    });
  }






  // The ones below not used currently.

  /**
   * Gets news with the given. Parameter can be null, but at least one parameter needs to be used.
   * @param country - country abbreviation
   * @param category - category, e.g. entertainment, general
   * @param keyword - keyword that needs to be in the news
   */
  getNews(country: string, category: string, keyword: string) {
    //TODO: add error check if all parameters null
    let params = new HttpParams().set("apiKey", this.APIKey);
    if (country) {
      params = params.set("country", keyword);
    }
    if (category) {
      params = params.set("category", keyword);
    }
    if (keyword) {
      params = params.set("q", keyword);
    }

    return this.http.get<{status: string, totalResults: number, articles: Article[]}>(
      "https://newsapi.org/v2/top-headlines",
      {
        params: params
      }
    ).pipe(
      take(1)
    );
  }


  /**
   * Returns a list of all the available news sources.
   * @param country - abbreviation of the country, e.g. gb, us, ...
   */
  getNewsSourcesByCountry(country: string) {
    const params = new HttpParams().set("apiKey", this.APIKey);
    params.set("country", country);

    return this.http.get<{status: string, sources: NewsSource[]}>(
      "https://newsapi.org/v2/sources",
      {
        params: params
      }
    ).pipe(
      take(1)
    );
  }
}
