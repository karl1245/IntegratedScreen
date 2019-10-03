import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from '../../shared/news/news.service';
import {Article} from '../../shared/news/article';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  articlesToDisplay: Article[];
  newsSub: Subscription;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsSub = this.newsService.newsSubject.subscribe(articles => {
      console.log(articles);
      this.articlesToDisplay = articles;
    });
  }

  ngOnDestroy() {
    this.newsSub.unsubscribe();
  }
}
