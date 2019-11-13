import {NgModule} from '@angular/core';
import {WeatherComponent} from './weather-feed/weather.component';
import {NewsComponent} from './news-feed/news.component';
import {DataFeedsComponent} from './data-feeds.component';
import {VideoFeedComponent} from './video-feed/video-feed.component';
import {CommonModule} from '@angular/common';
import {TransportComponent} from './transport-feed/transport.component';
import {RouterModule} from '@angular/router';
import {ClockComponent} from './clock/clock.component';
import {SafePipe} from './video-feed/safe.pipe';

@NgModule({
  declarations: [
    WeatherComponent,
    NewsComponent,
    DataFeedsComponent,
    VideoFeedComponent,
    TransportComponent,
    ClockComponent,
    SafePipe
  ],
  imports: [
    RouterModule,
    CommonModule

  ],
  exports: [
    WeatherComponent,
    NewsComponent,
    DataFeedsComponent,
    VideoFeedComponent,
    ClockComponent
  ]
})
export class DataFeedModule {

}
