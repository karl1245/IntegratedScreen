import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from '../../shared/news/news.service';
import {Article} from '../../shared/news/article';
import {Subscription} from 'rxjs';
import {
  MatCarouselSlideComponent,
  Orientation
} from '@ngmodule/material-carousel';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  articlesToDisplay: Article[];
  newsSub: Subscription;
  hideOverlay: any;
  overlayColor: 'none';
  public timings: '500ms ease-in';
  public autoplay = true;
  public loop = true;
  interval = 10000;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsSub = this.newsService.newsSubject.subscribe(articles => {
      this.articlesToDisplay = articles;
    });

    this.newsService.getNews();
  }

  ngOnDestroy() {
    this.newsSub.unsubscribe();
  }
}
