import { Component, OnInit } from '@angular/core';
import {NewsService} from '../../shared/news/news.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NewsSource} from '../../shared/news/news-source';

@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.css']
})
export class NewsAdminComponent implements OnInit {
  APIkey: string;

  APIKeyForm: FormGroup;
  newsForm: FormGroup;

  newsSources: NewsSource[] = [];
  selectedSource: NewsSource;

  numberOfArticles = 0;

  errorMessage: string;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.APIkey = this.newsService.APIKey;
    this.APIKeyForm = new FormGroup({
      'APIKey': new FormControl(this.newsService.APIKey)
    });
    this.newsService.getNewsSources().subscribe(sources => {
      this.newsSources = sources.sources;
    }, error1 => {
      this.errorMessage = error1.error.message;
      console.log(error1.error);
    });
    this.newsForm = new FormGroup({
      'newsSource': new FormControl(null),
      'keyword': new FormControl(null)
    });
  }

  onSaveAPIKey() {
    this.newsService.APIKey = this.APIKeyForm.value.APIKey;
  }

  onChange() {
    this.selectedSource = this.newsForm.value.newsSource;
  }

  onSelectedNews() {
    //TODO: maybe the ability to select multiple sources
    //TODO: check weather error handling
    const keyword = this.newsForm.value.keyword;
    const source = this.newsForm.value.newsSource.id;

    this.newsService.getNewsBySources([source], keyword).subscribe(response => {
      this.newsService.newsSubject.next(response.articles);
      this.numberOfArticles = response.articles.length;
    }, error1 => {
      this.newsService.errorSubject.next(error1);
    });
  }
}
