import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from '../../shared/news/news.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NewsSource} from '../../shared/news/news-source';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.css']
})
export class NewsAdminComponent implements OnInit, OnDestroy {
  APIkey: string;

  APIKeyForm: FormGroup;
  newsForm: FormGroup;

  newsSources: NewsSource[] = [];
  selectedSources = new Set<NewsSource>();

  errorMessageSources: string;
  errorSub: Subscription;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.APIkey = this.newsService.APIKey;
    this.APIKeyForm = new FormGroup({
      'APIKey': new FormControl(this.newsService.APIKey)
    });
    this.newsForm = new FormGroup({
      'newsSource': new FormControl(null)
    });

    this.newsService.getNewsSources().subscribe(sources => {
      this.newsSources = sources.sources;
    }, error1 => {
      this.errorMessageSources = error1.error.message;
    });

    this.errorSub = this.newsService.errorSubject.subscribe(message => {
      this.errorMessageSources = message;
    });

    this.selectedSources = new Set<NewsSource>(this.newsService.selectedSources);

  }

  onSaveAPIKey() {
    this.newsService.APIKey = this.APIKeyForm.value.APIKey;

  }

  onChange(event) {
    this.selectedSources.add((<NewsSource>event.value));
  }

  onSelectedNews() {
    this.newsService.getNewsBySources(Array.from(this.selectedSources));
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onRemoveSource(source: NewsSource) {
    this.selectedSources.delete(source);
  }

}
