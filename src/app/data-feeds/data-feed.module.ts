import {NgModule} from '@angular/core';
import {WeatherComponent} from './weather-feed/weather.component';
import {NewsComponent} from './news-feed/news.component';
import {DataFeedsComponent} from './data-feeds.component';
import { VideoFeedComponent } from './video-feed/video-feed.component';
import {CommonModule} from '@angular/common';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';

@NgModule({
  declarations: [
    WeatherComponent,
    NewsComponent,
    DataFeedsComponent,
    VideoFeedComponent
  ],
  imports: [
    CommonModule,
    NgxYoutubePlayerModule.forRoot()
  ],
  exports: [
    WeatherComponent,
    NewsComponent,
    DataFeedsComponent,
    VideoFeedComponent,
    NgxYoutubePlayerModule
  ]
})
export class DataFeedModule {

}
