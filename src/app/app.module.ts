import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from './shared/news/news.service';
import { WeatherService } from './shared/weather/weather.service';
import { AdminScreenModule } from './admin-screen/admin-screen.module';
import { DataFeedModule } from './data-feeds/data-feed.module';
import { TransportService } from './shared/transport/transport.service';
import { VideoService } from './shared/video/video.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {UpdateDataTimerService} from './shared/updateDataTimer.service';
import {StorageService} from './shared/storage.service';
import { SavedMessageComponent } from './admin-screen/saved-message/saved-message.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminScreenModule,
    DataFeedModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    NewsService,
    WeatherService,
    TransportService,
    VideoService,
    UpdateDataTimerService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
