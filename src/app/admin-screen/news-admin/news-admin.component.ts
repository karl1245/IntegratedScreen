import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from '../../shared/news/news.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NewsSource} from '../../shared/news/news-source';
import {Subscription} from 'rxjs';
import {InfoModalService} from '../../shared/info-modal.service';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.css', '../admin-screen.component.css']
})
export class NewsAdminComponent implements OnInit, OnDestroy {
  APIkey: string;

  APIKeyForm: FormGroup;
  newsForm: FormGroup;

  newsSources: NewsSource[] = [];
  selectedSources = new Set<NewsSource>();

  errorSub: Subscription;
  errorMessage: String;

  keySaved = false;
  newsSaved = false;

  constructor(private newsService: NewsService,
              private infoModalService: InfoModalService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.APIkey = this.newsService.APIKey;
    this.APIKeyForm = new FormGroup({
      'APIKey': new FormControl(this.newsService.APIKey)
    });
    this.newsForm = new FormGroup({
      'newsSource': new FormControl(null)
    });

    this.errorSub = this.newsService.errorSubject.subscribe(message => {
      this.errorMessage = message;
    });

    this.selectedSources = new Set<NewsSource>(this.newsService.selectedSources);

    this.updateNewsSources();
  }

  onSaveAPIKey() {
    this.newsService.APIKey = this.APIKeyForm.value.APIKey;
    this.updateNewsSources();
    this.keySaved = true;
  }

  onChange(event) {
    this.selectedSources.add((<NewsSource>event.value));
  }

  onSelectedNews() {
    this.newsService.getNewsBySources(Array.from(this.selectedSources));
    this.newsSaved = true;
  }

  onRemoveSource(source: NewsSource) {
    this.selectedSources.delete(source);
  }

  updateNewsSources() {
    this.newsService.getNewsSources().subscribe(sources => {
      this.newsService.errorSubject.next(null);
      this.newsSources = sources.sources;
    }, error => {
      this.newsService.errorSubject.next(error.error.message);
    });
  }

  openInfo() {
    this.infoModalService.openInfoNews(this.dialog);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
